import React from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Avatar from "../user/Avatar";
import millify from "millify";
import moment from "moment";
import Feather from '@expo/vector-icons/Feather';
function VideoCardProfile({ isStreaming, createdAt, image, title, views, user }) {
  return (
    <SafeAreaView className="w-[100px] h-[180px] rounded-lg overflow-hidden shadow-lg bg-gray-100 m-1 relative">
      {/* Streaming indicator */}
      {isStreaming && createdAt && (
        <View className="absolute top-3 left-2 z-10 flex-row items-center bg-red-500 rounded-full px-2 py-1">
          <Entypo name="controller-record" size={12} color="white" />
          <Text className="ml-1 text-xs text-white">{moment(createdAt).fromNow()}</Text>
        </View>
      )}
      {/* Thumbnail */}
      <Image className="w-full h-[180px]" source={{ uri: image }} resizeMode="cover" />
      {/* Video info */}
      <View className="p-2 flex-row items-center absolute top-[80%]">
         <Feather name="play" size={20} color="white"/>
        <Text className="text-white text-xs">{`${millify(views)} views`}</Text>
      </View>
    </SafeAreaView>
  );
}

export default VideoCardProfile;
