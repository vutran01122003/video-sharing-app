import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { TouchableOpacity } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ratio, timeLimit, videoQuality } from "../shared/video";
import CircleProgressBar from "../components/alert/CircleProgressBar";
import ModalScreen from "./ModalScreen"
import AnimatedAudioButton from "../components/custom/AnimatedAudioButton";
export default function CreateVideoScreen({ navigation, route }) {
    const cameraRef = useRef();
    const [permission, requestPermission] = useCameraPermissions();
    const [time, setTime] = useState(0);
    const [facing, setFacing] = useState("back");
    const [isRecord, setIsRecord] = useState(false);
    const [cameraFlash, setCameraFlash] = useState(false);
    const [isMute, setIsMute] = useState(false);    
    const [isAudioModal, setIsAudioModal] = useState(false);
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [nameAudio, setNameAudio] = useState('Add audio')
    const onGoHome = () => {
        navigation.navigate("Home");
    };

    const onRecordVideo = async () => {
        try {
            if (cameraRef.current && permission.granted && hasAudioPermission) {
                // setAudioStartTime(0);
                // setAudioEndTime(null);

                // const { sound: newSound } = await Audio.Sound.createAsync(require("../../assets/CDYT.mp3"), {
                //     shouldPlay: true
                // });

                // setSound(newSound);

                // await newSound.setPositionAsync(120 * 1000);
                // await newSound.playAsync();

                setIsRecord(true);

                const video = await cameraRef.current.recordAsync({ maxDuration: (timeLimit + 10) * 1000 });
                navigation.navigate("Upload", { videoUri: video.uri });
            }
        } catch (error) {
            throw error;
        }
    };

    const onStopRecordVideo = async () => {
        if (cameraRef.current) {
            await cameraRef.current.stopRecording();
            setTime(0);
            setIsRecord(false);

            // if (sound) {
            //     // const status = await sound.getStatusAsync();
            //     // const currentPosition = Math.floor(status.positionMillis / 1000);
            //     // setAudioEndTime(currentPosition);

            //     await sound.stopAsync();
            //     await sound.unloadAsync();
            //     setSound(null);

            //     console.log(`Stop! Nhạc đã phát từ giây ${audioStartTime} đến giây ${currentPosition}`);
            // }
        }
    };

    const onToggleCameraFacing = () => {
        setFacing((prev) => (prev === "back" ? "front" : "back"));
    };

    const onToggleCameraFlash = () => {
        setCameraFlash((prev) => !prev);
    };

    const onToggleMic = () => {
        setIsMute((prev) => !prev);
    };

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

    // useEffect(() => {
    //     return () => {
    //         if (sound) {
    //             sound.unloadAsync();
    //         }
    //     };
    // }, [sound]);

    if (!permission) return <View />;

    return (
        <SafeAreaView>
            <CameraView
                mode="video"
                ref={cameraRef}
                facing={facing}
                ratio={ratio}
                mute={isMute}
                videoQuality={videoQuality}
                enableTorch={cameraFlash}
            >
                <View className="h-full w-full relative">
                    <View className="w-full absolute top-9 left-0 flex-row items-center p-2">
                        <TouchableOpacity onPress={onGoHome}>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>

                     
                        <AnimatedAudioButton nameAudio={nameAudio} setIsAudioModal={setIsAudioModal} />
                    </View>

                    <View className="w-12 absolute right-2 top-24 gap-8">
                        <TouchableOpacity onPress={onToggleCameraFacing}>
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

                        <TouchableOpacity onPress={onToggleCameraFlash}>
                            <View className="gap-1 items-center">
                                <Ionicons
                                    name={cameraFlash ? "flash-outline" : "flash-off-outline"}
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
            </CameraView>
            <ModalScreen isModalShow={isAudioModal} setIsModalShow={setIsAudioModal} setNameAudio={setNameAudio} className="z-50" />
        </SafeAreaView>
    );
}
