import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSharedValue } from "react-native-worklets-core";
import { TouchableOpacity, SafeAreaView, Text, View, Image } from "react-native";
import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera as CameraFaceDetector } from "react-native-vision-camera-face-detector";
import { Camera, useCameraFormat, getCameraDevice, useCameraPermission } from "react-native-vision-camera";
import ModalScreen from "./ModalScreen";
import { timeLimit } from "../shared/video";
import CircleProgressBar from "../components/alert/CircleProgressBar";
import AnimatedAudioButton from "../components/custom/AnimatedAudioButton";
import pig_nose_filter from "../../assets/filter/pig_nose_filter.png";
import { Dimensions } from "react-native";

export default function CreateVideoScreen({ navigation, route }) {
    const windowWidth = Dimensions.get("window").width;

    const cameraRef = useRef();
    const [time, setTime] = useState(0);
    const format = useCameraFormat(device, [{ fps: 60, aspectRatio: 9 / 16 }]);

    const { hasPermission: hasCameraPermission, requestPermission } = useCameraPermission();
    const [hasAudioPermission, setHasAudioPermission] = useState(null);

    const [isAudioModal, setIsAudioModal] = useState(false);
    const [nameAudio, setNameAudio] = useState("Add audio");

    const [isMute, setIsMute] = useState(false);
    const [isTorch, setIsTorch] = useState(false);
    const [isRecord, setIsRecord] = useState(false);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

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

                cameraRef.current.startRecording({
                    onRecordingError: (error) => console.error(error),
                    onRecordingFinished: (video) => {
                        const path = video.path;
                        navigation.navigate("Upload", { videoUri: `file://${path}` });
                    }
                });
            }
        } catch (error) {
            throw error;
        }
    };

    const onStopRecordVideo = async () => {
        if (cameraRef.current) {
            setTime(0);
            setIsRecord(false);
            await cameraRef.current.stopRecording();
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
            setPosition({
                x: windowWidth - x + viewSize.width - 10,
                y: y - 10
            });
        }
    }
    console.log(position);

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
        try {
            (async () => {
                await requestPermission();
                const audioStatus = await Audio.requestPermissionsAsync();
                setHasAudioPermission(audioStatus.status === "granted");
            })();
        } catch (error) {
            throw error;
        }
    }, []);

    if (!hasCameraPermission) return <View />;
    if (device === null) return <View />;

    return (
        <SafeAreaView className="relative flex-1">
            <CameraFaceDetector
                ref={cameraRef}
                video={true}
                audio={true}
                format={format}
                device={device}
                resizeMode="cover"
                isActive={isFocused ? true : false}
                faceDetectionCallback={handleFacesDetection}
                faceDetectionOptions={faceDetectionOptions}
                isMirrored={false}
                style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
            />

            <View
                onLayout={(event) => {
                    setViewSize(event.nativeEvent.layout);
                }}
                style={{
                    position: "absolute",
                    top: position.y || 0,
                    left: position.x || 0
                }}
            >
                <Image source={pig_nose_filter} />
            </View>

            <View className="h-full w-full relative">
                <View className="w-full absolute top-9 left-0 flex-row items-center p-2">
                    <TouchableOpacity onPress={onGoHome}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>

                    <AnimatedAudioButton nameAudio={nameAudio} setIsAudioModal={setIsAudioModal} />
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
                            <Ionicons name={isTorch ? "flash-outline" : "flash-off-outline"} size={28} color="white" />
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
            <ModalScreen
                isModalShow={isAudioModal}
                setIsModalShow={setIsAudioModal}
                setNameAudio={setNameAudio}
                className="z-50"
            />
        </SafeAreaView>
    );
}
