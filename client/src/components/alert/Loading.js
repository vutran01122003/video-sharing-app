import { SafeAreaView, Text, View } from "react-native";

function Loading() {
    return (
        <SafeAreaView className="h-full w-full justify-center items-center">
            <View className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500">
                <Text>Loading...</Text>
            </View>
        </SafeAreaView>
    );
}

export default Loading;
