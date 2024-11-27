import { Audio } from "expo-av";
import RNFS from "react-native-fs";
import { Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as VideoThumbnails from "expo-video-thumbnails";
import { TouchableOpacity, SafeAreaView, Text, View, Image } from "react-native";
import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera as CameraFaceDetector } from "react-native-vision-camera-face-detector";
import { Camera, useCameraFormat, getCameraDevice, useCameraPermission } from "react-native-vision-camera";
import AudioModal from "../components/modal/AudioModal";
import { timeLimit } from "../shared/video";
import { applyFilter } from "../utils/commands";
import { downloadImageToCache } from "../utils/cacheImage";
import CircleProgressBar from "../components/alert/CircleProgressBar";
import AnimatedAudioButton from "../components/custom/AnimatedAudioButton";
import pig_nose_filter from "../../assets/images/filter/pig_nose_filter.png";

export default function CreateVideoScreen({ navigation, route }) {
    const fps = 60;
    const windowWidth = Dimensions.get("window").width;

    const cameraRef = useRef();
    const [time, setTime] = useState(0);
    const format = useCameraFormat(device, [{ fps, aspectRatio: 9 / 16 }]);

    const { hasPermission: hasCameraPermission, requestPermission } = useCameraPermission();
    const [hasAudioPermission, setHasAudioPermission] = useState(null);

    const [isAudioModal, setIsAudioModal] = useState(false);
    const [sound, setSound] = useState(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [audioStartTime, setAudioStartTime] = useState(0);
    const [audioEndTime, setAudioEndTime] = useState(null);

    const [isMute, setIsMute] = useState(false);
    const [isTorch, setIsTorch] = useState(false);
    const [isRecord, setIsRecord] = useState(false);

    const [videoPath, setVideoPath] = useState("");
    const [filterPath, setFilterPath] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [positions, setPositions] = useState([]);
    const [filterLayout, setFilterLayout] = useState({ width: 0, height: 0 });
    const [cameraSize, setCameraSize] = useState({ width: 0, height: 0, x: 0, y: 0 });

    const devices = Camera.getAvailableCameraDevices();
    const [device, setDevice] = useState(getCameraDevice(devices, "back"));

    const isFocused = useIsFocused();

    const faceDetectionOptions = useRef({
        landmarkMode: "all"
    }).current;

    const onGoHome = () => {
        navigation.navigate("Home");
    };

    const onRecordVideo = async () => {
        try {
            if (cameraRef.current && hasCameraPermission && hasAudioPermission) {
                setIsRecord(true);
                setStartTime(Date.now());

                Promise.all([
                    cameraRef.current.startRecording({
                        onRecordingError: (error) => console.error(error),
                        onRecordingFinished: async (video) => {
                            const path = video.path;
                            const thumbnail = await generateThumbnail(path);
                            navigation.navigate("Upload", { videoUri: path, thumbnail });
                            // setVideoPath(video.path);
                        }
                    }),
                    startMusic()
                ]);
            }
        } catch (error) {
            throw error;
        }
    };

    const onStopRecordVideo = async () => {
        if (cameraRef.current) {
            setTime(0);
            setIsRecord(false);
            await Promise.all([cameraRef.current.stopRecording(), stopMusic()]);
        }
    };

    const startMusic = async () => {
        if (currentAudio) {
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: currentAudio.audio_url });

            await newSound.setPositionAsync(audioStartTime * 1000);
            await newSound.playAsync();

            setSound(newSound);

            setTimeout(async () => {
                await newSound.unloadAsync();
                setSound(null);
            }, (audioEndTime - audioStartTime) * 1000);
        }
    };

    const stopMusic = async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            const currentPosition = status.positionMillis / 1000;

            setAudioEndTime(currentPosition);

            await sound.unloadAsync();
            setSound(null);

            console.log(`Stop! Nhạc đã phát từ giây ${audioStartTime} đến giây ${currentPosition}`);
        }
    };

    const onToggleCameraDevice = () => {
        const position = device?.position == "front" ? "back" : "front";
        setDevice(getCameraDevice(devices, position));
    };

    const onToggleCameraTorch = () => {
        setIsTorch((prev) => !prev);
    };

    const onToggleMic = () => {
        setIsMute((prev) => !prev);
    };

    function handleFacesDetection(faces) {
        if (true) {
            const { x, y } = faces[0].landmarks.NOSE_BASE;
            if (isRecord) {
                setPositions((prev) => [
                    ...prev,
                    {
                        x: x - filterLayout.width / 2,
                        y: y,
                        timestamp: (Date.now() - startTime) / 1000
                    }
                ]);
            }
        }
    }

    useEffect(() => {
        let timer = null;
        if (isRecord) {
            timer = setInterval(() => {
                setTime((prev) => {
                    if (prev === timeLimit) {
                        clearInterval(timer);
                        onStopRecordVideo();
                        return 0;
                    }
                    return prev + 0.5;
                });
            }, 500);
        }
        return () => clearInterval(timer);
    }, [isRecord]);

    useEffect(() => {
        (async () => {
            await requestPermission();
            const audioStatus = await Audio.requestPermissionsAsync();
            setHasAudioPermission(audioStatus.status === "granted");
        })();
    }, []);

    const generateThumbnail = async (outputVideo) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(`file://${outputVideo}`, {
                time: 15000
            });
            return uri;
        } catch (error) {
            throw error;
        }
    };

    // useEffect(() => {
    //     if (videoPath && filterPath && positions.length > 0) {
    //         Promise.all([RNFS.exists(videoPath), RNFS.exists(filterPath)]).then((results) => {
    //             if (results.every((result) => result))
    //                 applyFilter({
    //                     videoPath: videoPath,
    //                     filterPath: filterPath,
    //                     positions: positions
    //                 })
    //                     .then(async (outputVideo) => {
    //                         setPositions([]);
    //                         const thumbnail = await generateThumbnail(outputVideo);
    //                         navigation.navigate("Upload", { videoUri: outputVideo, thumbnail });
    //                     })
    //                     .catch((error) => {
    //                         throw error;
    //                     });
    //         });
    //     }
    // }, [videoPath, filterPath, positions.length]);

    useEffect(() => {
        (async () => {
            const cachePath = await downloadImageToCache(
                "https://res.cloudinary.com/dzm0nupxy/image/upload/v1731921259/video_sharing_app/filters/nbzpibvxwzpvuekenvyr.png"
            );
            setFilterPath(cachePath);
        })();
    }, []);

    useEffect(() => {
        if (sound) sound.unloadAsync();
    }, [isFocused]);

    if (!hasCameraPermission) return <View />;
    if (device === null) return <View />;

    return (
        <SafeAreaView>
            <View
                className="relative w-full h-full"
                onLayout={(event) => {
                    setCameraSize(event.nativeEvent.layout);
                }}
            >
                <CameraFaceDetector
                    ref={cameraRef}
                    video={true}
                    audio={currentAudio ? false : true}
                    format={format}
                    device={device}
                    resizeMode="cover"
                    isActive={isFocused ? true : false}
                    faceDetectionCallback={handleFacesDetection}
                    faceDetectionOptions={faceDetectionOptions}
                    isMirrored={false}
                    style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                />

                {/* <View
                    onLayout={(event) => {
                        setFilterLayout(event.nativeEvent.layout);
                    }}
                    style={{
                        position: "absolute",
                        top: positions[positions.length - 1]?.y - 10 || 0,
                        left: windowWidth - positions[positions.length - 1]?.x + 10 || 0
                    }}
                >
                    <Image source={pig_nose_filter} />
                </View> */}

                <View className="h-full w-full relative">
                    <View className="w-full absolute top-9 left-0 flex-row items-center p-2">
                        <TouchableOpacity onPress={onGoHome}>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>

                        <AnimatedAudioButton
                            nameAudio={currentAudio?.title || "Add audio"}
                            setIsAudioModal={setIsAudioModal}
                        />
                    </View>

                    <View className="w-12 absolute right-2 top-24 gap-8">
                        <TouchableOpacity onPress={onToggleCameraDevice}>
                            <View className="gap-1 items-center">
                                <Ionicons name="camera-reverse-outline" size={28} color="white" />
                                <Text className="color-white">Flip</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View className="gap-1 items-center">
                                <MaterialCommunityIcons name="movie-filter-outline" size={28} color="white" />
                                <Text className="color-white">Filter</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View className="gap-1 items-center">
                                <MaterialCommunityIcons name="clock-time-three-outline" size={28} color="white" />
                                <Text className="color-white">Timer</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onToggleCameraTorch}>
                            <View className="gap-1 items-center">
                                <Ionicons
                                    name={isTorch ? "flash-outline" : "flash-off-outline"}
                                    size={28}
                                    color="white"
                                />
                                <Text className="color-white">Flash</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onToggleMic}>
                            <View className="gap-1 items-center">
                                <Feather name={isMute ? "mic-off" : "mic"} size={28} color="white" />
                                <Text className="color-white">Mic</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="p-4 mb-2 w-full absolute bottom-0 left-0 flex-row justify-between items-center">
                        <TouchableOpacity>
                            <View className="gap-2 items-center">
                                <FontAwesome name="magic" size={28} color="white" />
                                <Text className="color-white">Effect</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={isRecord ? onStopRecordVideo : onRecordVideo}>
                            <View className="relative">
                                {isRecord && (
                                    <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <CircleProgressBar progress={time / timeLimit} />
                                    </View>
                                )}

                                <View
                                    className={`w-20 h-20 rounded-full ${
                                        !isRecord ? "bg-red-600 border-8 border-red-500/70" : "bg-red-600/30"
                                    }`}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View className="gap-2 items-center">
                                <FontAwesome name="image" size={28} color="white" />
                                <Text className="color-white">Upload</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <AudioModal
                    isModalShow={isAudioModal}
                    setAudioStartTime={setAudioStartTime}
                    setAudioEndTime={setAudioEndTime}
                    setIsModalShow={setIsAudioModal}
                    currentAudio={currentAudio}
                    setCurrentAudio={setCurrentAudio}
                    className="z-50"
                />
            </View>
        </SafeAreaView>
    );
}
