import { View, Text, Image, SafeAreaView } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function Avatar({ image, username, isStory, isCreateStoryButton, size }) {
    return (
        <SafeAreaView className="flex-col gap-2 items-center">
            <View className="relative">
                <Image
                    className={`w-${size} h-${size} rounded-full border-4 ${isStory ? "border-blue-400" : null}`}
                    source={{
                        uri: image
                    }}
                    alt="user_avatar"
                />

                {(isCreateStoryButton || isStory) && (
                    <View
                        className={`absolute -bottom-1 -right-1 h-8 w-8 ${
                            isCreateStoryButton ? "bg-main" : "bg-blue-500"
                        } rounded-full justify-center items-center`}
                    >
                        <Feather name={isCreateStoryButton ? "plus" : "video"} size={14} color="white" />
                    </View>
                )}
            </View>

            {(isCreateStoryButton || username) && <Text>{isCreateStoryButton ? "You" : username}</Text>}
        </SafeAreaView>
    );
}
