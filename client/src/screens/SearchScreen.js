import { Fragment, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { categorySearch, suggestionData, videoTypes } from "../shared";
import VideoCard from "../components/video/VideoCard";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, userSelector, videoSelector } from "../redux/selector";
import { getVideosByKeyword } from "../redux/actions/video.action";
import { getSeachingUsers } from "../redux/actions/user.action";
import Account from "../components/user/Account";

export default function SearchScreen({ navigation, route }) {
    const dispatch = useDispatch();

    const video = useSelector(videoSelector);
    const auth = useSelector(authSelector);
    const user = useSelector(userSelector);

    const authUser = auth?.user;
    const videos = video.searchingVideos;
    const users = user.searchingUsers;

    const [categoryIndex, setCategoryIndex] = useState(0);
    const [keyword, setKeyword] = useState("");

    const changeCategoryIndex = (index) => {
        setCategoryIndex(index);
    };

    const onClearSearchValue = () => {
        setKeyword("");
    };

    const onSearch = () => {
        if (!keyword) return;
        switch (categorySearch[categoryIndex]) {
            case categorySearch[0]:
                dispatch(getVideosByKeyword(keyword));
                break;
            case categorySearch[1]:
                dispatch(getSeachingUsers(keyword));
                break;
            default:
                break;
        }
        setKeyword("");
    };

    return (
        <SafeAreaView>
            <View className="w-full h-full bg-white p-5 pt-12">
                <View className="h-10 flex-row gap-6 items-center">
                    <View className="h-full flex-1 relative">
                        <TextInput
                            className="rounded-md bg-gray-100/90 h-full w-full px-3"
                            placeholder="Search video"
                            value={keyword}
                            onChangeText={setKeyword}
                        />
                        <View className="absolute right-2 top-1/2 -translate-y-1/2">
                            <TouchableOpacity onPress={onClearSearchValue}>
                                <Ionicons name="close" size={18} color={keyword ? "#333" : "gray"} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity onPress={onSearch}>
                        <AntDesign name="search1" size={26} color="#333" />
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-between p-4 px-0">
                    {categorySearch.map((categoryName, index) => (
                        <TouchableOpacity key={categoryName} onPress={() => changeCategoryIndex(index)}>
                            <View
                                className={`rounded-3xl justify-center items-center p-2 px-3
                                    ${categoryIndex === index ? "bg-main" : "bg-white"}`}
                            >
                                <Text className={categoryIndex === index ? "color-white" : "color-main"}>
                                    {categorySearch[index]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {categorySearch[categoryIndex] === categorySearch[0] && (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="w-full">
                            <View className="w-full flex-row flex-wrap justify-center gap-6 ">
                                {videos.length > 0 ? (
                                    <Fragment>
                                        {videos.map((item, index) => (
                                            <View className="w-5/12" key={item._id}>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        navigation.navigate("VideoAudio", {
                                                            user: authUser,
                                                            videoType: videoTypes.SEARCHING_VIDEOS,
                                                            indexVideo: index,
                                                            screen: "Search"
                                                        })
                                                    }
                                                >
                                                    <VideoCard
                                                        key={item._id}
                                                        image={item.thumbnail}
                                                        views={item.views}
                                                        likes={item.likes}
                                                        user={item.user}
                                                        title={item.title}
                                                        width="w-full"
                                                        imageHeight="h-60"
                                                        isSearching={true}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                        <View className="flex-row gap-1 items-center justify-center w-full mt-6">
                                            <Text className="color-main">Show more</Text>
                                            <Ionicons name="chevron-down" size={12} color="#F44B87" />
                                        </View>
                                    </Fragment>
                                ) : (
                                    <View className="flex-1 h-44 justify-center items-center">
                                        <Text className="font-semibold text-gray-600">NO RESULT AVAILABLE</Text>
                                    </View>
                                )}
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
                )}

                {categorySearch[categoryIndex] === categorySearch[1] &&
                    (users.length > 0 ? (
                        <ScrollView>
                            {users.map((user) => {
                                if (user._id === authUser._id) return null;

                                return <Account key={user._id} user={user} followingList={authUser.following} />;
                            })}
                        </ScrollView>
                    ) : (
                        <View className="flex-1 h-44 justify-center items-center">
                            <Text className="font-semibold text-gray-600">NO RESULT AVAILABLE</Text>
                        </View>
                    ))}
            </View>
        </SafeAreaView>
    );
}
