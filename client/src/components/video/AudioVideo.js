import React, { useState, useRef } from 'react';
import { View, Dimensions, TouchableOpacity, PanResponder, Animated,SafeAreaView, Pressable } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';


export default function AudioVideo({ videoUri }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0)).current;
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            scrollY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (Math.abs(gestureState.dy) > 150) {
                console.log('Swipe to next/previous video');
            }
            Animated.spring(scrollY, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        },
    });

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
        <SafeAreaView className="mt-11">
            <Animated.View
            className="w-full h-full"
            style={{
                transform: [{ translateY: scrollY }]
            }}
            {...panResponder.panHandlers}
        >
           
                <Video
                    ref={videoRef}
                    source={{ uri: videoUri }}
                    style={{ width: '100%', height: '100%' }} 
                    resizeMode="cover"
                    shouldPlay={isPlaying}
                    isLooping
                    isMuted={isMuted}
                    
                    onError={(error) => {
                        console.log("Video Error:", error)
                    }}
                    onLoadStart={() => {
                        console.log("Video starting to load...")
                    }}
                    onLoad={() => {
                        console.log("Video loaded successfully!")
                    }}
                />
          

            {/* Overlay Controls */}
            <View className="absolute inset-0 justify-between w-full items-center flex-row bottom-1 p-4">
                <TouchableOpacity
                    className="p-2.5 rounded-full bg-black/50"
                    onPress={togglePlayPause}
                >
                    <MaterialIcons
                        name={isPlaying ? "pause" : "play-arrow"}
                        size={50}
                        color="white"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    className="absolute bottom-5 right-5 p-2.5 rounded-full bg-black/50"
                    onPress={toggleMute}
                >
                    <MaterialIcons
                        name={isMuted ? "volume-off" : "volume-up"}
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            {/* Side Action Buttons */}
            <View className="absolute right-2.5 bottom-1/3 items-center gap-5">
                <TouchableOpacity className="my-2.5 p-2.5 bg-black/50 rounded-full">
                    <MaterialIcons name="favorite" size={35} color="white" />
                </TouchableOpacity>

                <TouchableOpacity className="my-2.5 p-2.5 bg-black/50 rounded-full">
                    <MaterialIcons name="chat" size={35} color="white" />
                </TouchableOpacity>

                <TouchableOpacity className="my-2.5 p-2.5 bg-black/50 rounded-full">
                    <MaterialIcons name="share" size={35} color="white" />
                </TouchableOpacity>
            </View>
            </Animated.View>
        </SafeAreaView>
    );
}
