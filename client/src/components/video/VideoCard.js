import { View, Text, Image, SafeAreaView, StyleSheet, Pressable } from "react-native";
import millify from "millify";
import moment from "moment";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import Avatar from "../user/Avatar";

function VideoCard({
    user,
    image,
    title,
    views,
    likes,
    width,
    imageHeight,
    isTrending,
    isStreaming,
    isSearching,
    createdAt
}) {
    return (
        <View className={`${width || "w-40"}`}>
            <View className={`relative rounded-lg overflow-hidden shadow-md w-full ${imageHeight || "h-52"}`}>
                {isStreaming && createdAt && (
                    <View className="rounded-3xl px-2 py-1 flex-row gap-1 bg-red-600 items-center absolute top-3 left-2 z-10">
                        <Entypo name="controller-record" size={12} color="white" />
                        <Text className="color-white text-xs">{`${moment(createdAt).fromNow()}`}</Text>
                    </View>
                )}

                {image && (
                    <Image
                        className="w-full h-full"
                        style={{ resizeMode: "cover" }}
                        source={{ uri: image }}
                        alt="thumbnail"
                    />
                )}

                <View className="absolute bottom-0 left-0 flex-row justify-between items-center px-2 pb-2 pt-1 bg-stone-600/80">
                    <View className="flex-1">
                        {(isStreaming || isTrending) && <Text className="font-bold color-white text-lg">{title}</Text>}
                        <View className="w-full flex-row items-center justify-between">
                            <View className="flex-row gap-1 items-center">
                                <Feather name="play" size={12} color="white" />
                                <Text className={`color-white text-sm`}>
                                    {`${millify(views || 0)} ${!isSearching ? "Views" : ""}`}
                                </Text>
                            </View>

                            {likes && (
                                <View className="flex-row gap-1 items-center">
                                    <Feather name="heart" size={12} color="white" />
                                    <Text className={`color-white text-sm`}>
                                        {`${millify(likes)} ${!isSearching ? "Likes" : ""}`}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {(isStreaming || isTrending) && <Avatar image={user.avatar} width="w-9" height="h-9" />}
                </View>
            </View>

            {isSearching && (
                <View className="w-full gap-1">
                    <View className="w-full">
                        <Text className="color-slate-800 font-semibold text-left" numberOfLines={2}>
                            {title}
                        </Text>
                    </View>

                    <Avatar isHorizontal={true} username={user.username} image={user.avatar} width="w-8" height="h-8" />
                </View>
            )}
        </View>
    );
}

export default VideoCard;
