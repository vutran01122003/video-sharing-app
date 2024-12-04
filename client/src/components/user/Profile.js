import React, { useState } from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useDispatch } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import VideoCard from "../video/VideoCard";
import { videoTypes } from "../../shared";
import { logout } from "../../redux/actions/auth.action";

export default function Profile({ user, videos, isAuthUser, screen }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = useState("videos");

    const tabs = [
        {
            id: "videos",
            label: "Videos",
            icon: <Feather name="play" size={18} color={activeTab === "videos" ? "#F44B87" : "gray"} />
        },
        {
            id: "images",
            label: "Images",
            icon: <FontAwesome name="image" size={18} color={activeTab === "images" ? "#F44B87" : "#333"} />
        },
        {
            id: "liked",
            label: "Liked",
            icon: <Feather name="heart" size={18} color={activeTab === "liked" ? "#F44B87" : "#333"} />
        }
    ];

    const onLogout = async () => {
        await dispatch(logout);
        navigation.navigate("Login");
    };

    return user ? (
        <SafeAreaView className="h-full bg-white">
            <View className="container h-full w-full p-2 bg-white">
                {isAuthUser && (
                    <View className="flex-row justify-between items-center px-2">
                        <View className="flex-row items-center gap-6">
                            <TouchableOpacity>
                                <AntDesign name="edit" size={24} color="#333" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("Follow")}>
                                <Feather name="user-plus" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row gap-1 items-center">
                            <TouchableOpacity onPress={onLogout}>
                                <MaterialIcons name="logout" size={26} color="#D22B2B" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View className="items-center gap-4">
                    <Image source={{ uri: user.avatar }} className="w-28 h-28 rounded-full" />
                    <Text className="text-center font-bold text-3xl">{user.user_name}</Text>
                    <View className="flex-row gap-12">
                        <View>
                            <Text className="text-center">{user.following.length}</Text>
                            <Text className="text-gray-400">Follwing</Text>
                        </View>
                        <View>
                            <Text className="text-center">{user.followers.length}</Text>
                            <Text className="text-gray-400">Followers</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-center">134</Text>
                            <Text className="text-gray-400">Like</Text>
                        </View>
                    </View>
                </View>

                <View className="p-4 my-2 flex-row justify-between items-center">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id)}
                            className="flex-1 items-center"
                        >
                            <View className="flex-row items-center gap-2">
                                {tab.icon}
                                <Text
                                    className={`${
                                        activeTab === tab.id ? "text-pink-500" : "text-slate-800"
                                    } text-lg font-semibold`}
                                >
                                    {tab.label}
                                </Text>
                            </View>
                            {activeTab === tab.id && <View className="h-1 bg-pink-500 absolute -bottom-4 w-full" />}
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView>
                    <View className="w-full flex-wrap flex-row gap-4 justify-center">
                        {activeTab === "videos" && videos.length > 0 ? (
                            videos.map((video, index) => (
                                <View className="w-5/12" key={video._id}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("VideoAudio", {
                                                user,
                                                videoType: videoTypes.MY_VIDEOS,
                                                indexVideo: index,
                                                screen
                                            })
                                        }
                                    >
                                        <VideoCard
                                            image={video.thumbnail}
                                            views={video.views}
                                            imageHeight="h-60"
                                            width="w-full"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : (
                            <View className="flex-1 h-44 justify-center items-center">
                                <Text className="font-semibold text-gray-600">NO RESULT AVAILABLE</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    ) : null;
}
