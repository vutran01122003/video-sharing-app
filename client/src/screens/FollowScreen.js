import { SafeAreaView, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import { users } from "../shared";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/selector";
import Avatar from "../components/user/Avatar";

const tabs = [
    {
        _id: "followers",
        label: "followers"
    },
    {
        _id: "following",
        label: "following"
    }
];

export default function FollowScreen({ navigation, route }) {
    const auth = useSelector(authSelector);
    const user = auth.user;

    const [activeTab, setActiveTab] = useState("followers");

    const RenderItemFollowing = ({ item }) => {
        return (
            <View className="mt-4 flex-row items-center justify-between p-4">
                <View className=" flex-row justify-center items-center gap-4">
                    <Image
                        source={{ uri: item.avatar }}
                        style={{ resizeMode: "cover", width: 50, height: 50, borderRadius: 100 }}
                    />
                    <Text className="text-lg font-bold color-gray-600">{item?.username}</Text>
                </View>
                <View className="flex-row items-center gap-2">
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
        );
    };

    const renderItemFollowers = ({ item }) => {
        return (
            <View className="mt-4 flex-row items-center justify-between p-4 border-b border-gray-200">
                <View className=" flex-row justify-center items-center gap-4">
                    <Image
                        source={{ uri: item.avatar }}
                        style={{ resizeMode: "cover", width: 50, height: 50, borderRadius: 100 }}
                    />
                    <Text className="text-lg font-bold color-gray-600">{item?.username}</Text>
                </View>
                <View className="flex-row items-center gap-4">
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
        );
    };

    return user ? (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row justify-between p-4">
                <View className="flex-row items-center gap-4 ">
                    <TouchableOpacity>
                        <Ionicons name="chevron-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Avatar image={user.avatar} width="w-16" height="h-16" />
                    <View>
                        <Text className="font-bold text-2xl text-slate-800">{user.user_name}</Text>
                    </View>
                </View>
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity>
                        <Fontisto name="search" size={20} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="filter" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex-1 mt-2 w-full mb-8">
                <View className="flex-row items-center justify-around w-full pb-4">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab._id}
                            ClassName="flex-1 items-center"
                            onPress={() => setActiveTab(tab._id)}
                        >
                            <View className="flex-row items-center gap-2 relative">
                                <Text
                                    className={`${activeTab === tab._id ? "text-pink-500" : "text-gray-400"} text-lg`}
                                >
                                    {user[tab.label].length}
                                </Text>
                                <Text
                                    className={`${activeTab === tab._id ? "text-pink-500" : "text-gray-400"} text-lg`}
                                >
                                    {tab.label}
                                </Text>
                                {activeTab === tab._id && (
                                    <View className="h-1 bg-pink-500 absolute -bottom-1 w-full" />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {activeTab === "following" && (
                    <View>
                        <FlatList
                            data={users.slice(0, 4)}
                            renderItem={RenderItemFollowing}
                            keyExtractor={(item) => item._id}
                        />
                        <View className="w-full h-16 bg-slate-50 p-4 justify-center mt-8">
                            <Text className=" font-bold text-gray-500 text-xl">Suggestions for you</Text>
                        </View>
                        <FlatList
                            data={users.slice(4)}
                            renderItem={renderItemFollowers}
                            keyExtractor={(item) => item._id}
                        />
                    </View>
                )}

                {activeTab === "followers" && (
                    <FlatList data={users} renderItem={renderItemFollowers} keyExtractor={(item) => item._id} />
                )}
            </View>
        </SafeAreaView>
    ) : null;
}
