import { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, PanResponder, Animated, SafeAreaView, Dimensions } from "react-native";
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import CommentsModal from "../modal/ModalComment";

export default function AudioVideo({  videoUri, width, height, isPreview, initialIndex=0}) {
    const videoRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { videos, indexVideo } = useRoute().params;
    const [currentIndex, setCurrentIndex] = useState(initialIndex ?? indexVideo);
    const [currentVideo, setCurrentVideo] = useState(videos[initialIndex]);
    const [isSwipeEnabled, setIsSwipeEnabled] = useState(true);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const isFocus = useIsFocused();
    
    // Thêm một timer để tránh việc swipe liên tục
    const swipeThrottleTimeout = useRef(null);
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    useEffect(() => {
        
        return () => {
            // Cleanup timer khi component unmount
            if (swipeThrottleTimeout.current) {
                clearTimeout(swipeThrottleTimeout.current);
            }
        };
    }, []);
    // load lại video khi chuyển tab
    async function loadVideo(){
        if(!isFocus){
            if (videoRef.current) {
                await videoRef.current.pauseAsync();
                await videoRef.current.unloadAsync();
            } 
        }else{
            if (videoRef.current) {
                await videoRef.current.loadAsync({uri:videoUri ?? currentVideo.url});
                await videoRef.current.playAsync();
               
            }
        }}
    useEffect(() => {
        loadVideo();
    }, [isFocus]);
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => isSwipeEnabled,
        onMoveShouldSetPanResponder: () => isSwipeEnabled,
        onPanResponderMove: (evt, gestureState) => {
            scrollY.setValue(gestureState.dy);
        },
        onPanResponderRelease: async (evt, gestureState) => {
            if (!isSwipeEnabled) return;

            const SWIPE_THRESHOLD = 100;
            if (Math.abs(gestureState.dy) > SWIPE_THRESHOLD) {
                setIsSwipeEnabled(false); // Tạm thời vô hiệu hóa swipe

                if (gestureState.dy < 0) {
                    await handleSwipe('up');
                } else {
                    await handleSwipe('down');
                }

                // Cho phép swipe lại sau 500ms
                swipeThrottleTimeout.current = setTimeout(() => {
                    setIsSwipeEnabled(true);
                }, 500);
            }

            Animated.spring(scrollY, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 8,
            }).start();
        }
    });

    const handleSwipe = async (direction) => {
        // Tính toán index mới
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }),
            // Thay đổi video
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
        let newIndex;
        if (direction === 'up') {
            newIndex = (currentIndex + 1) % videos.length;
        } else {
            newIndex = currentIndex - 1 < 0 ? videos.length - 1 : currentIndex - 1;
        }

        // Dừng video hiện tại
        if (videoRef.current) {
            await videoRef.current.pauseAsync();
        }

        // Cập nhật state
        setCurrentIndex(newIndex);
        setCurrentVideo(videos[newIndex]);
        setIsPlaying(true);
        // Đảm bảo video mới sẽ play
        setTimeout(async () => {
            if (videoRef.current) {
                try {
                    await videoRef.current.playAsync();
                } catch (error) {
                    console.log("Error playing new video:", error);
                }
            }
        }, 100);
    };

    const togglePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = async () => {
        if (videoRef.current) {
            await videoRef.current.setIsMutedAsync(!isMuted);
            setIsMuted(!isMuted);
        }
    };

    return (
        <SafeAreaView className='flex-1'>
            <Animated.View
                className={`${width ?? "w-full"} ${height ?? "h-full"}`}
                style={{
                    transform: [{ translateY: scrollY }]
                }}
                {...panResponder.panHandlers}
            >
                <Video
                    isLooping
                    ref={videoRef}
                    
                    resizeMode="cover"
                    source={{ uri: videoUri ?? currentVideo.url }}
                    shouldPlay={isPlaying}
                    isMuted={isMuted}
                    style={{
                        width: screenWidth,
                        height: screenHeight - 20,
                        position: 'absolute',
                        top: 40,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}
                    onError={(error) => {
                        console.log("Video Error:", error);
                    }}
                />

                <View className="absolute inset-0 justify-between w-full items-center flex-row bottom-1 p-4">
                    <TouchableOpacity  onPress={togglePlayPause}>
                        <MaterialIcons name={isPlaying ? "pause" : "play-arrow"} size={50} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={toggleMute}
                    >
                        <MaterialIcons name={isMuted ? "volume-off" : "volume-up"} size={30} color="white" />
                    </TouchableOpacity>
                </View>

                {!isPreview && (
                    <View className="absolute right-2.5 bottom-1/3 items-center gap-5">
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
                )}
            </Animated.View>
            <CommentsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                className="z-40"
            />
        </SafeAreaView>
    );
}