import { View, Text, Image, SafeAreaView } from "react-native";

function AudioCard({ image, title, type }) {
    return (
        <SafeAreaView className="w-full">
            <Image className="w-28 h-28 rounded-lg shadow-md" source={{ uri: image }} alt="thumbnail" />
            <View className="">
                <Text className="font-bold color-slate-800 text-base">{title}</Text>
                <Text className="color-gray-400">{type}</Text>
            </View>
        </SafeAreaView>
    );
}

export default AudioCard;
