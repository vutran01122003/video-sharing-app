import { Video } from "expo-av";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, TouchableOpacity, Animated, SafeAreaView, Dimensions, ScrollView, BackHandler } from "react-native";
import CommentsModal from "../components/modal/ModalComment";

export default function WatchingScreen({ navigation, route }) {
    const { videos, indexVideo, screen } = route.params;
    const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

    const scrollRef = useRef();
    const videoRef = useRef();
    const isFocus = useIsFocused();

    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(null);

    const togglePlayPause = async () => {
        if (videoRef.current) {
            isPlaying ? await videoRef.current.pauseAsync() : await videoRef.current.playAsync();
            setIsPlaying((prev) => !prev);
        }
    };

    const toggleMute = async () => {
        setIsMuted((prev) => !prev);
    };

    const handleScroll = (event) => {
        const positionY = event.nativeEvent.contentOffset.y;
        const diff = positionY - screenHeight * currentIndex;

        let index = currentIndex;

        if (Math.abs(diff) / screenHeight > 0.2) {
            index = diff > 0 ? currentIndex + 1 : currentIndex - 1;
            setCurrentIndex(index);
        }

        scrollRef.current?.scrollTo({
            y: index * screenHeight
        });
    };

    useEffect(() => {
        const backAction = () => {
            navigation.navigate(screen);
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, [screen]);

    useEffect(() => {
        setCurrentIndex(indexVideo);
    }, [indexVideo, isFocus]);

    useEffect(() => {
        if (!isPlaying) setIsPlaying(true);
    }, [currentIndex]);

    useEffect(() => {
        if (scrollRef.current)
            scrollRef.current?.scrollTo({
                y: indexVideo * screenHeight
            });
    }, [scrollRef.current, isFocus, indexVideo]);

    return (
        <SafeAreaView className="h-full w-full relative">
            <TouchableOpacity onPress={() => navigation.navigate(screen)}>
                <View className="absolute top-2 left-2 w-9 h-9">
                    <AntDesign name="arrowleft" size={35} color="white" />
                </View>
            </TouchableOpacity>

            <ScrollView
                ref={scrollRef}
                onScrollEndDrag={handleScroll}
                contentContainerStyle={{ flexGrow: 1 }}
                showsHorizontalScrollIndicator={false}
                style={{ position: "absolute", zIndex: -1, top: 0, left: 0, width: "100%", height: "100%" }}
            >
                <View className="h-full w-full">
                    {videos.length > 0 &&
                        videos.map((video, index) => (
                            <View style={{ height: screenHeight, width: screenWidth }} key={video._id}>
                                <Video
                                    ref={index === currentIndex ? videoRef : null}
                                    isLooping={true}
                                    resizeMode="cover"
                                    source={{ uri: video.video_url }}
                                    shouldPlay={index === currentIndex ? true : false}
                                    isMuted={isMuted}
                                    style={{
                                        flex: 1
                                    }}
                                />

                                <View className="absolute right-4 bottom-1/3 items-center gap-12">
                                    <TouchableOpacity className="my-2.5 p-2.5 bg-black/50 rounded-full">
                                        <MaterialIcons name="favorite" size={35} color="white" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                                        <MaterialIcons name="chat" size={35} color="white" />
                                    </TouchableOpacity>

                                    <TouchableOpacity className="my-2.5 p-2.5 bg-black/50 rounded-full">
                                        <MaterialIcons name="share" size={35} color="white" />
                                    </TouchableOpacity>
                                </View>

                                <View className="absolute justify-between w-full items-center flex-row bottom-12 px-6">
                                    <TouchableOpacity onPress={() => togglePlayPause(video._id)}>
                                        <MaterialIcons
                                            name={isPlaying ? "pause" : "play-arrow"}
                                            size={40}
                                            color="white"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={toggleMute}>
                                        <MaterialIcons
                                            name={isMuted ? "volume-off" : "volume-up"}
                                            size={35}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {modalVisible && currentIndex === index && (
                                    <CommentsModal
                                        visible={modalVisible}
                                        onClose={() => setModalVisible(false)}
                                        className="z-40"
                                        video_id={video._id}
                                    />
                                )}
                            </View>
                        ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
