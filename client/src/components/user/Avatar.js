import { View, Text, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function Avatar({ image, username, isStory, isCreateStoryButton, width, height, isHorizontal }) {
    return (
        <View className={`gap-2 items-center ${isHorizontal ? "flex-row" : "flex-col"}`}>
            <View className={`relative ${width || "w-16"} ${height || "h-16"}`}>
                <Image
                    className={`w-full h-full rounded-full ${
                        isStory ? "border-2 border-blue-400" : "border border-gray-200"
                    }`}
                    source={{
                        uri: image
                    }}
                    alt="user_avatar"
                />

                {(isCreateStoryButton || isStory) && (
                    <View
                        className={`absolute -bottom-1 -right-1 h-8 w-8 rounded-full justify-center items-center 
                            ${isCreateStoryButton ? "bg-main" : "bg-blue-500"}`}
                    >
                        <Feather name={isCreateStoryButton ? "plus" : "video"} size={14} color="white" />
                    </View>
                )}
            </View>

            {(isCreateStoryButton || username) && (
                <Text className="color-gray-500">{isCreateStoryButton ? "You" : username}</Text>
            )}
        </View>
    );
}
