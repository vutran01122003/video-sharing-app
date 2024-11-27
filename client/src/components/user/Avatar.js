import { View, Text, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function Avatar({
    image,
    username,
    isStory,
    isVideo,
    isCreateStoryButton,
    width,
    height,
    isHorizontal,
    borderColor,
    borderWidth
}) {
    return (
        <View className={`gap-2 items-center ${isHorizontal ? "flex-row" : "flex-col"}`}>
            <View className={`relative ${width || "w-16"} ${height || "h-16"}`}>
                <Image
                    className={`w-full h-full rounded-full ${
                        isStory ? "border-2 border-blue-400" : "border border-gray-200"
                    } ${borderWidth} ${borderColor}`}
                    source={{
                        uri: image
                    }}
                    alt="user_avatar"
                />

                {(isCreateStoryButton || isStory || isVideo) && (
                    <View
                        className={`absolute -bottom-1 -right-1 h-8 w-8 rounded-full justify-center items-center 
                            ${isCreateStoryButton || isVideo ? "bg-main" : "bg-blue-500"}`}
                    >
                        <Feather name={isCreateStoryButton || isVideo ? "plus" : "video"} size={14} color="white" />
                    </View>
                )}
            </View>

            {(isCreateStoryButton || username) && (
                <Text className="color-gray-500">{isCreateStoryButton ? "You" : username}</Text>
            )}
        </View>
    );
}
