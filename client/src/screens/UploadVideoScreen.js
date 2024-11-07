import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView, Text } from "react-native";
import VideoCard from "../components/video/VideoCard";
import AudioVideo from "../components/video/AudioVideo";

export default function UploadVideoScreen({ navigation, route }) {
    const videoUri = route.params?.videoUri;

    const onUploadVideo = async () => {
        try {
            const formData = new FormData();

            formData.append("upload_preset", "oyptwxxs");
            formData.append("file", {
                name: "SampleVideo.mp4",
                uri: videoUri,
                type: "video/mp4"
            });

            const res = await fetch("https://api.cloudinary.com/v1_1/dzm0nupxy/upload", {
                method: "POST",
                body: formData
            });

            console.log(res);
        } catch (error) {
            throw error;
        }
    };

    return (
        <SafeAreaView>
            <View className="w-full h-full p-5">
                <TouchableOpacity onPress={() => navigation.navigate("Create")}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>

                <AudioVideo videoUri={videoUri} width="w-2/3" height="h-2/3" />

                <TouchableOpacity onPress={onUploadVideo}>
                    <View className="bg-main p-2 w-24 rounded-2xl items-center justify-center">
                        <Text className="color-white font-semibold">Upload</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
