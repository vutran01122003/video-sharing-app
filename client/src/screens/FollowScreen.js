import { SafeAreaView, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import { users } from "../shared";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/selector";
import Avatar from "../components/user/Avatar";
import Account from "../components/user/Account";

const tabs = [
    {
        _id: "following",
        label: "Following"
    },
    {
        _id: "followers",
        label: "Followers"
    }
];

export default function FollowScreen({ navigation, route }) {
    const auth = useSelector(authSelector);
    const user = auth.user;

    const [activeTab, setActiveTab] = useState("following");

    const renderItemFollowers = ({ item }) => {
        return (
            <View className="mt-4 flex-row items-center justify-between p-4 border-b border-gray-200">
                <View className=" flex-row justify-center items-center gap-4">
                    <Image
                        source={{ uri: item?.avatar }}
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
                    <Avatar image={user?.avatar} width="w-16" height="h-16" />
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
                                    {user[tab._id].length}
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
                        {user.following.length > 0 ? (
                            user.following.map((followingUser) => (
                                <Account
                                    key={followingUser._id}
                                    user={followingUser}
                                    screen="Follow"
                                    followingList={user.following}
                                />
                            ))
                        ) : (
                            <View className="flex-1 h-44 justify-center items-center">
                                <Text className="font-semibold text-gray-600">NO RESULT AVAILABLE</Text>
                            </View>
                        )}

                        <View className="w-full h-16 bg-slate-50 p-4 justify-center mt-8">
                            <Text className=" font-bold text-gray-500 text-xl">Suggestions for you</Text>
                        </View>
                        <FlatList data={users} renderItem={renderItemFollowers} keyExtractor={(item) => item._id} />
                    </View>
                )}

                {activeTab === "followers" &&
                    (user.followers.length > 0 ? (
                        user.followers.map((follower) => (
                            <Account
                                key={follower._id}
                                user={follower}
                                screen="Follow"
                                followingList={user.following}
                            />
                        ))
                    ) : (
                        <View className="flex-1 h-44 justify-center items-center">
                            <Text className="font-semibold text-gray-600">NO RESULT AVAILABLE</Text>
                        </View>
                    ))}
            </View>
        </SafeAreaView>
    ) : null;
}
