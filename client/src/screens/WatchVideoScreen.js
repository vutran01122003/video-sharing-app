import { Audio, Video } from "expo-av";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    ScrollView,
    BackHandler,
    Text,
    Image,
    StatusBar
} from "react-native";
import CommentModal from "../components/modal/CommentModal";
import { useDispatch, useSelector } from "react-redux";
import { videoSelector } from "../redux/selector";
import { likeVideo, unlikeVideo } from "../redux/actions/video.action";
import millify from "millify";
import Avatar from "../components/user/Avatar";
import moment from "moment";

export default function WatchingScreen({ navigation, route }) {
    const dispatch = useDispatch();

    const video = useSelector(videoSelector);
    const { user, videoType, indexVideo, screen } = route.params;
    const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

    const scrollRef = useRef();
    const videoRef = useRef();
    const isFocus = useIsFocused();

    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [sound, setSound] = useState(null);
    const [timer, setTimer] = useState(null);

    const togglePlayPause = async (index) => {
        try {
            const video = videoRef?.current;
            if (video) {
                const { durationMillis, positionMillis } = await video.getStatusAsync();

                if (positionMillis && durationMillis === positionMillis) {
                    // Create new sound and video to play again
                    setCurrentIndex(null);
                    setCurrentIndex(index);
                } else {
                    isPlaying ? await video.pauseAsync() : await video.playAsync();
                    setIsPlaying((prev) => !prev);
                }
            }
        } catch (error) {
            console.log(error);
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

    const handleLikeVideo = (video_id) => {
        dispatch(likeVideo(video_id, videoType));
    };

    const handleUnlikeVideo = (video_id) => {
        dispatch(unlikeVideo(video_id, videoType));
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

    // Prepare audio data.
    // Automatically reset video control.
    useEffect(() => {
        try {
            const audioData = video[videoType][currentIndex]?.audioData;

            setIsLoading(true);

            if (!isPlaying) setIsPlaying(true);
            if (audioData)
                Audio.Sound.createAsync({ uri: audioData.audio.audio_url }).then(({ sound }) => {
                    setSound(sound);
                });
        } catch (error) {
            console.log(error);
        }
    }, [currentIndex, isFocus]);

    // Move scroll to selected video.
    useEffect(() => {
        if (scrollRef.current)
            scrollRef.current?.scrollTo({
                y: indexVideo * screenHeight
            });
    }, [scrollRef.current, isFocus, indexVideo]);

    // Play audio after loading video.
    useEffect(() => {
        try {
            const audioData = video[videoType][currentIndex]?.audioData;
            if (!isLoading && audioData && sound) {
                let timerId = null;
                const { start_time, end_time } = audioData;
                const time = (end_time - start_time) * 1000;

                sound.setPositionAsync(start_time * 1000).then(() => {
                    sound.playAsync().then(() => {
                        timerId = setTimeout(async () => {
                            await sound.unloadAsync();
                            setSound(null);
                        }, time);
                        setTimer(timerId);
                    });
                });

                return () => {
                    clearTimeout(timerId);
                };
            }
        } catch (error) {
            console.log(error);
        }
    }, [isLoading, sound]);

    // Clear sound after going other screen.
    // Clear sound after wacthing other video.
    useEffect(() => {
        return () => {
            if (sound) {
                try {
                    sound.unloadAsync();
                    setSound(null);
                } catch (error) {
                    console.log(error);
                }
            }
        };
    }, [currentIndex, sound, isFocus]);

    useEffect(() => {
        if (!isFocus) setCurrentIndex(null);
    }, [isFocus]);

    // Play and pause audio and create new setTimeOut to stop play audio.
    useEffect(() => {
        try {
            const audioData = video[videoType][currentIndex]?.audioData;
            if (sound && audioData && !isLoading) {
                const endTimeMs = audioData.end_time * 1000;
                (async () => {
                    const { isPlaying: isPlayingAudio, positionMillis } = await sound.getStatusAsync();
                    if (positionMillis !== 0 && positionMillis <= endTimeMs) {
                        if (isPlayingAudio && !isPlaying) {
                            if (timer) clearTimeout(timer);
                            await sound.pauseAsync();
                        }
                        if (!isPlayingAudio && isPlaying) {
                            let timerId = null;

                            await sound.playAsync();

                            timerId = setTimeout(async () => {
                                await sound.unloadAsync();
                            }, endTimeMs - positionMillis);

                            setTimer(timerId);
                        }
                    }
                })();
            }
        } catch (error) {
            console.log(error);
        }
    }, [sound, isPlaying, isLoading, timer]);

    useFocusEffect(
        useCallback(() => {
            StatusBar.setHidden(true);

            return () => {
                StatusBar.setHidden(false);
            };
        }, [])
    );

    return video[videoType] ? (
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
                    {video[videoType].length > 0 &&
                        video[videoType].map((video, index) => {
                            if (index === currentIndex) {
                                return (
                                    <View
                                        style={{ height: screenHeight, width: screenWidth, backgroundColor: "black" }}
                                        key={video._id}
                                    >
                                        <Video
                                            ref={index === currentIndex ? videoRef : null}
                                            resizeMode="cover"
                                            source={{ uri: video.video_url }}
                                            shouldPlay={true}
                                            isMuted={isMuted}
                                            style={{
                                                flex: 1
                                            }}
                                            onLoad={() => {
                                                setIsLoading(false);
                                            }}
                                            onPlaybackStatusUpdate={(status) => {
                                                const { durationMillis, positionMillis } = status;
                                                if (durationMillis && positionMillis === durationMillis)
                                                    setIsPlaying(false);
                                            }}
                                        />

                                        <View className="absolute right-4 bottom-1/3 items-center gap-8">
                                            {video.user?.avatar && (
                                                <Avatar
                                                    image={video.user.avatar}
                                                    isVideo={
                                                        video.user._id !== user._id &&
                                                        !user.following.includes(video.user._id)
                                                    }
                                                />
                                            )}

                                            <View className="items-center">
                                                <TouchableOpacity
                                                    className="p-2.5 bg-black/50 rounded-full"
                                                    onPress={() => {
                                                        video.likes.includes(user._id)
                                                            ? handleUnlikeVideo(video._id)
                                                            : handleLikeVideo(video._id);
                                                    }}
                                                >
                                                    <MaterialIcons
                                                        name="favorite"
                                                        size={35}
                                                        color={video.likes.includes(user._id) ? "#F44B87" : "white"}
                                                    />
                                                </TouchableOpacity>
                                                <Text className="text-white font-semibold">
                                                    {video.likes.length > 0 && millify(video.likes.length)}
                                                </Text>
                                            </View>

                                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                                {video.is_comment_allowed && (
                                                    <FontAwesome name="commenting" size={35} color="white" />
                                                )}
                                            </TouchableOpacity>

                                            <TouchableOpacity className="my-2.5 p-2.5 bg-black/50 rounded-full">
                                                <MaterialIcons name="share" size={35} color="white" />
                                            </TouchableOpacity>
                                        </View>

                                        <View className="absolute w-full bottom-1 px-4 gap-4">
                                            <View className="flex-row">
                                                <View className="gap-1">
                                                    <View className="flex-row gap-2 items-center">
                                                        <Text className="text-white font-bold text-lg">
                                                            @{video.user.user_name}
                                                        </Text>
                                                        <Text className="text-white">
                                                            {moment(video.createdAt).fromNow()}
                                                        </Text>
                                                    </View>

                                                    <Text className="text-white font-semibold">{`${
                                                        video.title
                                                    } ${video.hashtags
                                                        .map((hashtag) => `#${hashtag}`)
                                                        .join(" ")}`}</Text>

                                                    {video.description && (
                                                        <Text className="text-white font-semibold">
                                                            {video.description}
                                                        </Text>
                                                    )}
                                                </View>
                                            </View>

                                            <View className="justify-between w-full items-center flex-row">
                                                <TouchableOpacity onPress={() => togglePlayPause(index)}>
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
                                        </View>

                                        {modalVisible && currentIndex === index && (
                                            <CommentModal
                                                visible={modalVisible}
                                                onClose={() => setModalVisible(false)}
                                                className="z-40"
                                                video_id={video._id}
                                            />
                                        )}
                                    </View>
                                );
                            }
                            return (
                                <Image
                                    key={index}
                                    source={{ uri: video.thumbnail }}
                                    style={{ height: screenHeight, width: screenWidth, resizeMode: "cover" }}
                                />
                            );
                        })}
                </View>
            </ScrollView>
        </SafeAreaView>
    ) : null;
}
