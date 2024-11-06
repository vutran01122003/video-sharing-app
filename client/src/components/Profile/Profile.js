import React, { useState } from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { videos } from "../../shared";
import VideoCard from "../video/VideoCard";
import { AntDesign } from "@expo/vector-icons";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("videos");
    const tabs = [
        {
            id: "videos",
            label: "My Videos",
            icon: <Feather name="play" size={20} color={activeTab === "videos" ? "#F44B87" : "gray"} />
        },
        {
            id: "images",
            label: "My Images",
            icon: <FontAwesome name="image" size={20} color={activeTab === "images" ? "#F44B87" : "gray"} />
        },
        {
            id: "liked",
            label: "Liked",
            icon: <Feather name="heart" size={20} color={activeTab === "liked" ? "#F44B87" : "gray"} />
        }
    ];

    const renderItem = ({ item }) => (
        <VideoCard image={item.thumbnail} views={item.views} width="w-3/10" imageHeight={"h-44"} />
    );

    return (
        <SafeAreaView className="container h-full w-full mt-11 p-2">
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity>
                        <Feather name="menu" size={30} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="user-plus" size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                <View className="flex-row gap-1 items-center">
                    <AntDesign name="edit" size={14} color="#F44B87" />
                    <Text className="color-main">Edit Profile</Text>
                </View>
            </View>

            <View className="justify-start flex-[2]">
                <View className="items-center">
                    <Image source={require("../../../assets/My Profile/Container 71.png")} />
                    <Text className="text-center font-bold text-3xl">Ruth Sanders</Text>
                    <View className="flex-row gap-12 mt-8">
                        <View>
                            <Text className="text-center">203</Text>
                            <Text className="text-gray-400">Follwing</Text>
                        </View>
                        <View>
                            <Text className="text-center">628</Text>
                            <Text className="text-gray-400">Followers</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-center">2634</Text>
                            <Text className="text-gray-400">Like</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View className="p-4 mt-16 flex-[6]">
                <View className="flex-row justify-between items-center">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id)}
                            className="flex-1 items-center"
                        >
                            <View className="flex-row items-center gap-2">
                                {tab.icon}
                                <Text className={`${activeTab === tab.id ? "text-pink-500" : "text-gray-400"} text-lg`}>
                                    {tab.label}
                                </Text>
                            </View>
                            {activeTab === tab.id && <View className="h-1 bg-pink-500 absolute -bottom-4 w-full" />}
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="items-center w-full">
                    {activeTab === "videos" && (
                        <FlatList
                            numColumns={3}
                            data={videos}
                            keyExtractor={(item) => item._id}
                            renderItem={renderItem}
                            contentContainerStyle={{ paddingTop: 15 }}
                            columnWrapperStyle={{ justifyContent: "space-between" }}
                            className="mt-6"
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}
