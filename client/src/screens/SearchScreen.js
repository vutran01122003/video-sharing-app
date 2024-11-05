import { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { categorySeach } from "../shared/category";
import { searchingData, suggestionData } from "../shared";
import VideoCard from "../components/video/VideoCard";

export default function SearchScreen({ navigation, route }) {
    const [categoryIndex, setCategoryIndex] = useState(0);

    const changeCategoryIndex = (index) => {
        setCategoryIndex(index);
    };

    return (
        <SafeAreaView>
            <View className="w-full h-full bg-white p-5 pt-12">
                <View className="h-10 flex-row gap-6 items-center">
                    <View className="h-full flex-1 relative">
                        <TextInput
                            className="rounded-md bg-gray-100/90 h-full w-full px-3"
                            placeholder="Search video"
                        />
                        <View className="absolute right-2 top-1/2 -translate-y-1/2">
                            <Ionicons name="close" size={18} color="gray" />
                        </View>
                    </View>
                    <Ionicons name="filter" size={24} color="gray" />
                </View>

                <View className="flex-row items-center justify-between p-4 px-0">
                    {categorySeach.map((categoryName, index) => (
                        <TouchableOpacity key={categoryName} onPress={() => changeCategoryIndex(index)}>
                            <View
                                className={`rounded-3xl justify-center items-center p-2 px-3
                                    ${categoryIndex === index ? "bg-main" : "bg-white"}`}
                            >
                                <Text className={categoryIndex === index ? "color-white" : "color-main"}>
                                    {categorySeach[index]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="w-full">
                        <View className="w-full flex-row flex-wrap justify-center gap-6">
                            {searchingData.map((item) => {
                                if (categorySeach[categoryIndex].toLocaleLowerCase() === item.type.toLocaleLowerCase())
                                    return (
                                        <VideoCard
                                            key={item._id}
                                            image={item.thumbnail}
                                            views={item.views}
                                            likes={item.likes}
                                            user={item.user}
                                            title={item.title}
                                            width="w-5/12"
                                            imageHeight="h-60"
                                            isSearching={true}
                                        />
                                    );

                                return null;
                            })}
                        </View>

                        <View className="flex-row gap-1 items-center justify-center w-full mt-6">
                            <Text className="color-main">Show more</Text>
                            <Ionicons name="chevron-down" size={12} color="#F44B87" />
                        </View>

                        <View className="mt-6 gap-6">
                            <Text className="font-bold text-lg color-slate-800">Maybe you are interested</Text>
                            <View className="flex-row gap-2 flex-wrap">
                                {suggestionData.map((name, index) => (
                                    <View key={index} className="bg-#f0f6ff rounded-2xl p-2">
                                        <Text className="color-#7aafff">{name}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
