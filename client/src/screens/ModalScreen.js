import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Modal, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'; // For icons

const audioData = [
    { id: '1', title: 'Beautiful lady', duration: '00:30', image: '../../assets/Create Video - Select Music/Image 49.png' },
    { id: '2', title: 'Nice day', duration: '00:30', image: '../../assets/Create Video - Select Music/Image 50.png' },
    { id: '3', title: 'Sunny', duration: '00:30', image: '../../assets/Create Video - Select Music/Image 51.png' },
    { id: '4', title: 'Flowers', duration: '00:30', image: '../../assets/Create Video - Select Music/Image 52.png' },
    { id: '5', title: 'Morning coffee', duration: '00:30', image: '../../assets/Create Video - Select Music/Image 53.png' },
];

const imgMapping = {
    '../../assets/Create Video - Select Music/Image 49.png': require('../../assets/Create Video - Select Music/Image 49.png'),
    '../../assets/Create Video - Select Music/Image 50.png': require('../../assets/Create Video - Select Music/Image 50.png'),
    '../../assets/Create Video - Select Music/Image 51.png': require('../../assets/Create Video - Select Music/Image 51.png'),
    '../../assets/Create Video - Select Music/Image 52.png': require('../../assets/Create Video - Select Music/Image 52.png'),
    '../../assets/Create Video - Select Music/Image 53.png': require('../../assets/Create Video - Select Music/Image 53.png'),
}
export default function AddAudioModal({isModalShow, setIsModalShow}) {
    const [activeTab, setActiveTab] = useState('For you');
    const [showSearch, setShowSearch] = useState(false);
   
    const renderAudioItem = ({ item }) => (
        
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200 focus:bg-pink-300">
            <View className="flex-row items-center">
                <Image source={imgMapping[item.image]} className="w-10 h-10 rounded-lg mr-4" />
                <View>
                    <Text className="text-lg font-semibold">{item.title}</Text>
                    <Text className="text-gray-500">{item.duration}</Text>
                </View>
            </View>
            <View className="flex-row gap-4">
                <TouchableOpacity >
                    <View className="bg-white px-4 py-1 rounded-md border-1 border-main">
                        <Text className="text-main">Use</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="ml-2">
                    <Feather name="more-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>

);

return (
        
             
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

                        {/* Tabs */}
                        <View className="flex-row mb-4 gap-3 justify-between w-full">
                            {['For you', 'Trending', 'Saved'].map((tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}

                                >
                                    <View className={`px-6 py-2 ${activeTab === tab ? 'bg-[#F44B87] rounded-full border-r-0' : ""}`}>
                                        <Text className={` font-medium ${activeTab === tab ? 'text-white' : 'text-[#F44B87]'}`}>{tab}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Search Bar */}
                        {showSearch && (

                            <View className="flex-row items-center bg-gray-200 px-4 py-2 rounded-lg mb-4">
                                <Feather name="search" size={20} color="gray" />
                                <TextInput
                                    placeholder="Search"
                                    className="ml-2 flex-1"
                                    placeholderTextColor="gray"
                                />
                            </View>
                        )

                        }


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
    );
}
