import { SafeAreaView, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

function TopicCard({ topic, isExpandTopic }) {
    return (
        <SafeAreaView className="h-20 w-20 bg-gray-100/70 justify-center p-1 items-center gap-2">
            {isExpandTopic ? (
                <Text className="font-bold text-xl color-yellow-300">+20</Text>
            ) : (
                <Feather name={topic?.icon} size={24} color={topic.color ?? "black"} />
            )}

            <Text className="text-sm color-gray-500">{isExpandTopic ? "Topics" : topic.name}</Text>
        </SafeAreaView>
    );
}

export default TopicCard;
