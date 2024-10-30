import { View, Text } from "react-native";

export default function HomeScreen({ navigation, route }) {
    return (
        <View className="flex-1 items-center justify-center bg-red">
            <Text className="text-red-500">Home Screen</Text>
        </View>
    );
}
