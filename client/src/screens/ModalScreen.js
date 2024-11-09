import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Modal, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'; // For icons
import { Audio } from 'expo-av';
import TimeSelectionComponent from '../components/custom/TimeSelectionComponent';


const audioData = [
    { id: '1', title: 'Hẹn gặp lại anh', duration: 43, image: '../../assets/Create Video - Select Music/Image 49.png', url: 'https://res.cloudinary.com/dyj2mpgxi/video/upload/f_auto:video,q_auto/v1/NhacTikTok/HenGapLaiAnh' },
    { id: '2', title: 'Nơi vực trời', duration: 58, image: '../../assets/Create Video - Select Music/Image 50.png', url: 'https://res.cloudinary.com/dyj2mpgxi/video/upload/f_auto:video,q_auto/v1/NhacTikTok/NoiVucTroi' },
    { id: '3', title: 'Là anh ngộ nhận', duration: 57, image: '../../assets/Create Video - Select Music/Image 51.png', url: 'https://res.cloudinary.com/dyj2mpgxi/video/upload/f_auto:video,q_auto/v1/NhacTikTok/LaAnhNgoNhan' },
    { id: '4', title: 'Flowers', duration: 30, image: '../../assets/Create Video - Select Music/Image 52.png' },
    { id: '5', title: 'Morning coffee', duration: 30, image: '../../assets/Create Video - Select Music/Image 53.png' },
];

const imgMapping = {
    '../../assets/Create Video - Select Music/Image 49.png': require('../../assets/Create Video - Select Music/Image 49.png'),
    '../../assets/Create Video - Select Music/Image 50.png': require('../../assets/Create Video - Select Music/Image 50.png'),
    '../../assets/Create Video - Select Music/Image 51.png': require('../../assets/Create Video - Select Music/Image 51.png'),
    '../../assets/Create Video - Select Music/Image 52.png': require('../../assets/Create Video - Select Music/Image 52.png'),
    '../../assets/Create Video - Select Music/Image 53.png': require('../../assets/Create Video - Select Music/Image 53.png'),
}

export default function AddAudioModal({ isModalShow, setIsModalShow, setNameAudio }) {
    const [activeTab, setActiveTab] = useState('For you');
    const [showSearch, setShowSearch] = useState(false);
    const [sound, setSound] = useState(null);
    const [audioStartTime, setAudioStartTime] = useState(0);
    const [audioEndTime, setAudioEndTime] = useState(null);
    const [showTimeSelection, setShowTimeSelection] = useState(false);
    const [duration, setDuration] = useState(0);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [playbackTimer, setPlaybackTimer] = useState(null);
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);
    useEffect(() => {
        return () => {
            if (playbackTimer) {
                clearInterval(playbackTimer);
            }
        };
    }, [playbackTimer]);
    const handleMorePress = (item) => {
        setSelectedAudio(item);
        setShowTimeSelection(true);
    };
    
    const handleTimeSelect = async (startTime, endTime) => {
        if (sound) {
            // Clear any existing timer
            if (playbackTimer) {
                clearInterval(playbackTimer);
            }

            // Set initial position
            await sound.setPositionAsync(startTime * 1000);
            setAudioStartTime(startTime);
            setAudioEndTime(endTime);

            // Start playing from selected position
            await sound.playAsync();

            // Create interval to check current position
            const timer = setInterval(async () => {
                const status = await sound.getStatusAsync();
                const currentPosition = status.positionMillis / 1000; // Convert to seconds

                if (currentPosition >= endTime) {
                    // Stop playback when reaching end time
                    await sound.pauseAsync();
                    clearInterval(timer);
                    setPlaybackTimer(null);
                }
            }, 100); // Check every 100ms

            setPlaybackTimer(timer);
        }
        setShowTimeSelection(false);
    };

    const renderAudioItem = ({ item }) => (
        <TouchableOpacity onPress={() => startMusic(item.url, item.duration)}>
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                <View className="flex-row items-center">
                    <Image source={imgMapping[item.image]} className="w-10 h-10 rounded-lg mr-4" />
                    <View>
                        <Text className="text-lg font-semibold">{item.title}</Text>
                        <Text className="text-gray-500">{`${item.duration} seconds`}</Text>
                    </View>
                </View>
                <View className="flex-row gap-4">
                    <TouchableOpacity onPress={() => stopMusic(item.title)}>
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

    const startMusic = async (url, duration) => {
        try {
            if (playbackTimer) {
                clearInterval(playbackTimer);
                setPlaybackTimer(null);
            }

            setAudioStartTime(0);
            setAudioEndTime(null);
            setDuration(duration);

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: url },
                { shouldPlay: true }
            );
            setSound(newSound);
            await newSound.playAsync();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }

    const stopMusic = async (nameAudio) => {
        try {
            if (sound) {
                // Clear any existing timer
                if (playbackTimer) {
                    clearInterval(playbackTimer);
                    setPlaybackTimer(null);
                }

                const status = await sound.getStatusAsync();
                const currentPosition = Math.floor(status.positionMillis / 1000);
                setAudioEndTime(currentPosition);

                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
                setNameAudio(nameAudio);
                setIsModalShow(false);
                console.log(`Stop! Nhạc đã phát từ giây ${audioStartTime} đến giây ${currentPosition}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalShow}
                onRequestClose={() => setIsModalShow(!isModalShow)}
            >
                <View className="flex-1 justify-end">
                    <View className="h-1/2 bg-white rounded-t-3xl p-4">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-xl font-bold">Add audio</Text>
                            <View className="flex-row items-center gap-2">
                                <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
                                    <Feather name="search" size={24} color="gray" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsModalShow(false)}>
                                    <Feather name="x" size={24} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="flex-row mb-4 gap-3 justify-between w-full">
                            {['For you', 'Trending', 'Saved'].map((tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                >
                                    <View className={`px-6 py-2 ${activeTab === tab ? 'bg-[#F44B87] rounded-full' : ""}`}>
                                        <Text className={`font-medium ${activeTab === tab ? 'text-white' : 'text-[#F44B87]'}`}>{tab}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {showSearch && (
                            <View className="flex-row items-center bg-gray-200 px-4 py-2 rounded-lg mb-4">
                                <Feather name="search" size={20} color="gray" />
                                <TextInput
                                    placeholder="Search"
                                    className="ml-2 flex-1"
                                    placeholderTextColor="gray"
                                />
                            </View>
                        )}

                        {activeTab === 'For you' && (
                            <FlatList
                                data={audioData}
                                renderItem={renderAudioItem}
                                keyExtractor={(item) => item.id}
                            />
                        )}
                    </View>
                </View>
            </Modal>

            <TimeSelectionComponent
                isVisible={showTimeSelection}
                onClose={() => setShowTimeSelection(false)}
                duration={duration} // or replace with actual duration
                onTimeSelect={handleTimeSelect}
            />
        </>
    );
}
