import { SafeAreaView, View, Image, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";

export default function Header() {
    return (
        <SafeAreaView className="bg-white h-24 flex-row items-center px-4 pt-5 justify-between border-b-2 border-stone-200">
            <View className="flex-row items-center gap-2">
                <Image source={require("../../../assets/Home_Video_Listing/logo_app.png")} />
                <Text className="font-bold color-slate-800 text-xl">Video Sharing App</Text>
            </View>

            <TouchableOpacity>
                <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
