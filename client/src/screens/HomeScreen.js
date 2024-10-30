import { View, Text } from "react-native";

export default function HomeScreen({ navigation, route }) {
    return (
        <View style={{ height: "100%" }}>
            <Text onPress={() => navigation.navigate("ProfileScreen")}>Home Screen</Text>
        </View>
    );
}
