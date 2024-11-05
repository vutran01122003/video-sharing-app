import millify from "millify";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import { View, Text, Image, SafeAreaView } from "react-native";
import Avatar from "../user/Avatar";

function VideoCard({ isStreaming, createdAt, image, title, views, user }) {
    return (
        <SafeAreaView className="w-40 h-52 relative rounded-lg overflow-hidden shadow-md">
            {isStreaming && createdAt && (
                <View className="rounded-3xl px-2 py-1 flex-row gap-1 bg-red-600 items-center absolute top-3 left-2 z-10">
                    <Entypo name="controller-record" size={12} color="white" />
                    <Text className="color-white text-xs">{`${moment(createdAt).fromNow()}`}</Text>
                </View>
            )}
            <Image className="w-full h-full" source={{ uri: image }} alt="thumbnail" />
            <View className="absolute bottom-0 left-0 flex-row justify-between items-center px-2 pb-2 pt-1 bg-stone-800/45 ">
                <View className="flex-1">
                    <Text className="font-bold color-white text-lg">{title}</Text>
                    <Text className="color-white text-sm">{`${millify(views)} views`}</Text>
                </View>
                <View>
                    <Avatar image={user.avatar} size={8} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default VideoCard;
