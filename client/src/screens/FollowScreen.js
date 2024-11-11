import { SafeAreaView, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import { users } from "../shared";

export default function FollowScreen({ navigation, route }) {
    const [activeTab, setActiveTab] = useState("followers");
    const tabs = [
        {
            "_id": "followers",
            'label': "followers",
            'num': 368
        },
        {
            "_id": "following",
            'label': "following",
            'num': 456
        }
    ]
    const RenderItemFollowing = ({ item }) => {
        return (
            <View className="mt-4 flex-row items-center justify-between p-4">
                <View className=" flex-row justify-center items-center gap-4">
                    <Image source={{ uri: item.avatar }} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 100 }} />
                    <Text className="text-lg font-bold color-gray-600">{item?.username}</Text>
                </View>
                <View className='flex-row items-center gap-2'>
                    <TouchableOpacity>
                        <View className="border-1 border-gray-400 w-32 h-12 rounded-md items-center justify-center">
                            <Text className="text-gray-400 font-bold">Following</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="more-vertical" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const renderItemFollowers = ({ item }) => {
        return (
            <View className="mt-4 flex-row items-center justify-between p-4 border-b border-gray-200">
                <View className=" flex-row justify-center items-center gap-4">
                    <Image source={{ uri: item.avatar }} style={{ resizeMode: 'cover', width: 50, height: 50, borderRadius: 100 }} />
                    <Text className="text-lg font-bold color-gray-600">{item?.username}</Text>
                </View>
                <View className='flex-row items-center gap-4'>
                    <TouchableOpacity>
                        <View className="bg-blue-500 w-32 h-12 rounded-md items-center justify-center">
                            <Text className="text-white font-boldqr">Follow</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="close" size={24} color="#F44B87" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView className="flex-1 mt-12">
            <View className="flex-row justify-between p-4">
                <View className="flex-row items-center gap-1 ">
                    <TouchableOpacity>
                        <Ionicons name="chevron-back" size={30} color="gray" />
                    </TouchableOpacity>
                    <Image source={require('../../assets/My Profile/Container 71.png')} className="w-20 h-20" />
                    <View>
                        <Text className="font-bold text-2xl text-gray-600">Ruth Sanders</Text>
                    </View>
                </View>
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity>
                        <Fontisto name="search" size={24} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="filter" size={24} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-1 mt-6 w-full mb-8">
                <View className="flex-row items-center justify-around w-full">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab._id}
                            ClassName="flex-1 items-center"
                            onPress={() => setActiveTab(tab._id)}
                        >
                            <View className="flex-row items-center gap-2">
                                <Text className={`${activeTab === tab._id ? "text-pink-500" : "text-gray-400"} text-lg`}>{tab.num}</Text>
                                <Text className={`${activeTab === tab._id ? "text-pink-500" : "text-gray-400"} text-lg`}>
                                    {tab.label}
                                </Text>
                            </View>
                            {activeTab === tab._id && <View className="h-1 bg-pink-500 absolute -bottom-4 w-full" />}
                        </TouchableOpacity>
                    ))}
                </View>
                {activeTab === "following" && (
                    <View>
                        <FlatList
                            data={users.slice(0, 4)}
                            renderItem={RenderItemFollowing}
                            keyExtractor={item => item._id}
                        />
                        <View className="w-full h-16 bg-slate-50 p-4 justify-center mt-8">
                            <Text className=" font-bold text-gray-500 text-xl">Suggestions for you</Text>
                        </View>
                        <FlatList
                            data={users.slice(4)}
                            renderItem={renderItemFollowers}
                            keyExtractor={item => item._id}
                        />
                    </View>               
)}
                {activeTab === "followers" && (
                    <FlatList
                        data={users}
                        renderItem={renderItemFollowers}
                        keyExtractor={item => item._id}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
