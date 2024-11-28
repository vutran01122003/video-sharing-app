import { Audio } from "expo-av";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, FlatList, Image, Modal, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import TimeSelectionComponent from "../custom/TimeSelectionComponent";
import { getAudios } from "../../redux/actions/audio.action";
import { audioSelector } from "../../redux/selector";
import { audioTypes, keyMapping } from "../../shared";

export default function AddAudioModal({
    isModalShow,
    setIsModalShow,
    setAudioStartTime,
    setAudioEndTime,
    currentAudio,
    setCurrentAudio
}) {
    const dispatch = useDispatch();
    const audio = useSelector(audioSelector);

    const [activeTab, setActiveTab] = useState(audioTypes[0]);
    const [showSearch, setShowSearch] = useState(false);
    const [sound, setSound] = useState(null);
    const [showTimeSelection, setShowTimeSelection] = useState(false);

    const handleCloseAudioModal = async () => {
        setIsModalShow(false);
        clearMusic();
    };

    const handleMorePress = async (audio) => {
        if (sound) await sound.stopAsync();
        setCurrentAudio(audio);
        setShowTimeSelection(true);
    };

    const handleTimeSelect = async (startTime, endTime) => {
        try {
            setAudioStartTime(startTime);
            setAudioEndTime(endTime);

            const { sound: newSound } = await Audio.Sound.createAsync({ uri: currentAudio.audio_url });

            await newSound.setPositionAsync(startTime * 1000);
            await newSound.playAsync();

            setSound(newSound);

            setTimeout(async () => {
                await newSound.unloadAsync();
            }, (endTime - startTime) * 1000);
        } catch (error) {
            throw error;
        }
    };

    const startMusic = async (audio) => {
        try {
            setCurrentAudio(audio);
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: audio.audio_url }, { shouldPlay: true });
            setSound(newSound);
        } catch (error) {
            throw error;
        }
    };

    const clearMusic = async (isKeepAudioSource) => {
        try {
            if (sound) {
                await sound.unloadAsync();
                setSound(null);

                if (!isKeepAudioSource) setCurrentAudio(null);
            }
        } catch (error) {
            throw error;
        }
    };

    const useMusic = async (audio) => {
        await clearMusic(currentAudio?._id === audio._id);
        setCurrentAudio(audio);
        setIsModalShow(false);
    };

    useEffect(() => {
        dispatch(getAudios());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            if (sound) sound.unloadAsync();
        };
    }, [sound]);

    useEffect(() => {
        if (currentAudio?._id) {
            setAudioStartTime(0);
            setAudioEndTime(null);
        }
    }, [currentAudio]);

    const renderAudioItem = ({ item }) => (
        <TouchableOpacity onPress={() => (currentAudio?._id === item._id ? clearMusic() : startMusic(item))}>
            <View
                className={`flex-row items-center justify-between p-4 border-b border-gray-200 
                    ${currentAudio?._id === item._id ? "bg-gray-100" : ""}`}
            >
                <View className="flex-row items-center">
                    <Image source={{ uri: item.thumbnail }} className="w-10 h-10 rounded-lg mr-4" />
                    <View>
                        <Text className="text-lg font-semibold">{item.title}</Text>
                        <Text className="text-gray-500">{`${item.duration} seconds`}</Text>
                    </View>
                </View>
                <View className="flex-row gap-4">
                    <TouchableOpacity onPress={() => useMusic(item)}>
                        <View className="bg-white px-4 py-1 rounded-md border border-main">
                            <Text className="text-main">Use</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleMorePress(item)}>
                        <Feather name="more-horizontal" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalShow}
                onRequestClose={handleCloseAudioModal}
            >
                <View className="flex-1 justify-end">
                    <View className="h-1/2 bg-white rounded-t-3xl p-4">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-xl font-bold">Add audio</Text>
                            <View className="flex-row items-center gap-4">
                                <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
                                    <Feather name="search" size={24} color="#333" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCloseAudioModal}>
                                    <Feather name="x" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="flex-row mb-4 gap-3 justify-between w-full">
                            {audioTypes.map((tab) => (
                                <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                                    <View
                                        className={`px-6 py-2 ${activeTab === tab ? "bg-[#F44B87] rounded-full" : ""}`}
                                    >
                                        <Text
                                            className={`font-medium ${
                                                activeTab === tab ? "text-white" : "text-[#F44B87]"
                                            }`}
                                        >
                                            {tab}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {showSearch && (
                            <View className="flex-row items-center bg-gray-200 px-4 py-2 rounded-lg mb-4">
                                <Feather name="search" size={20} color="gray" />
                                <TextInput placeholder="Search" className="ml-2 flex-1" placeholderTextColor="gray" />
                            </View>
                        )}

                        <FlatList
                            data={audio[keyMapping[activeTab]]}
                            renderItem={renderAudioItem}
                            keyExtractor={(item) => item._id}
                        />
                    </View>
                </View>
            </Modal>

            {currentAudio && (
                <TimeSelectionComponent
                    isVisible={showTimeSelection}
                    onClose={() => setShowTimeSelection(false)}
                    onTimeSelect={handleTimeSelect}
                    audio={currentAudio}
                />
            )}
        </>
    );
}
