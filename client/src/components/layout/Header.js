import { SafeAreaView, View, Image, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import AppLogo from "../../../assets/images/logo/logo_app.png";

export default function Header() {
    return (
        <SafeAreaView className="bg-white h-20 flex-row items-center px-4 justify-between border-b-2 border-stone-200">
            <View className="flex-row items-center gap-2">
                <Image source={AppLogo} />
                <Text className="font-bold color-slate-800 text-xl">Video Sharing App</Text>
            </View>

            <TouchableOpacity>
                <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
