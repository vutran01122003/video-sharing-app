import RNFS from "react-native-fs";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { filterData, filterTypes } from "../../shared";
import { downloadImageToCache } from "../../utils/cacheImage";

export default function FilterModal({
    isModalShow,
    setIsModalShow,
    setFilterPath,
    filterPath,
    selectedFilter,
    setSelectedFilter
}) {
    const [activeTab, setActiveTab] = useState(filterTypes[0]);

    const useFilter = async (filter) => {
        setSelectedFilter(filter);

        const cachePath = await downloadImageToCache(filter.image);

        setFilterPath(cachePath);
        setIsModalShow(false);
    };

    const removeFilter = async () => {
        setSelectedFilter(null);
        setFilterPath("");
        await RNFS.unlink(filterPath);
    };

    const renderAudioItem = ({ item }) => {
        const isSelected = selectedFilter?._id === item._id;

        return (
            <TouchableOpacity onPress={() => (isSelected ? removeFilter() : useFilter(item))}>
                <View
                    className={`flex-row items-center justify-between p-4 border-b border-gray-200 ${
                        isSelected ? "bg-gray-100" : ""
                    }`}
                >
                    <View className="flex-row items-center">
                        <Image source={{ uri: item.image }} className="w-10 h-10 rounded-lg mr-4" />
                        <Text className="text-lg font-semibold">{item.name}</Text>
                    </View>
                    <View className="flex-row gap-4">
                        <TouchableOpacity onPress={() => (isSelected ? removeFilter() : useFilter(item))}>
                            <View
                                className={` px-4 py-1 rounded-md border border-main ${
                                    isSelected ? "bg-main" : "bg-white"
                                }`}
                            >
                                <Text className={isSelected ? "text-white" : "text-main"}>
                                    {isSelected ? "Remove" : "Select"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalShow}
            onRequestClose={() => setIsModalShow(false)}
        >
            <View className="flex-1 justify-end">
                <View className="h-1/2 bg-white rounded-t-3xl p-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold">Select filter</Text>
                        <View className="flex-row items-center gap-2">
                            <TouchableOpacity onPress={() => setIsModalShow(false)}>
                                <Feather name="x" size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-row mb-4 gap-3 justify-between w-full">
                        {filterTypes.map((tab) => (
                            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                                <View className={`px-6 py-2 ${activeTab === tab ? "bg-[#F44B87] rounded-full" : ""}`}>
                                    <Text
                                        className={`font-medium ${activeTab === tab ? "text-white" : "text-[#F44B87]"}`}
                                    >
                                        {tab}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <FlatList data={filterData} renderItem={renderAudioItem} keyExtractor={(item) => item._id} />
                </View>
            </View>
        </Modal>
    );
}
