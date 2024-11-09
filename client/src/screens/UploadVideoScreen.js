import { useRef, useState } from "react";
import { AntDesign, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Switch, ScrollView, Modal } from "react-native";
import { watchModeList } from "../shared/video";
import AudioVideo from "../components/video/AudioVideo";

export default function UploadVideoScreen({ navigation, route }) {
    const videoUri = route.params?.videoUri;

    const [hashtagValue, setHashtagValue] = useState("");
    const [hashtagList, setHashtagList] = useState([]);
    const [watchModeIndex, setWatchModeIndex] = useState(0);
    const [isOpenWatchModeModal, setOpenWatchModeModal] = useState(false);
    const [allowComment, setAllowComment] = useState(true);
    const [shareFacebook, setShareFacebook] = useState(false);
    const [shareTwitter, setShareTwitter] = useState(false);
    const [shareInstagram, setShareInstagram] = useState(false);

    const onToggleWatchModeDisplay = () => {
        setOpenWatchModeModal((prev) => !prev);
    };

    const onSetWatchModeIndex = (index) => {
        setWatchModeIndex(index);
        onToggleWatchModeDisplay();
    };

    const onToggleAllowComment = () => {
        setAllowComment((prev) => !prev);
    };

    const onToggleShareFacebook = () => {
        setShareFacebook((prev) => !prev);
    };

    const onToggleShareTwitter = () => {
        setShareTwitter((prev) => !prev);
    };

    const onToggleInstagram = () => {
        setShareInstagram((prev) => !prev);
    };

    const onAddHashTag = (e) => {
        if (hashtagValue) {
            setHashtagList((prev) => Array.from(new Set([...prev, hashtagValue])));
            setHashtagValue("");
        }
    };

    const removeHashtag = (index) => {
        if (hashtagList[index]) {
            const _newList = [...hashtagList];
            _newList.splice(index, 1);
            setHashtagList(_newList);
        }
    };

    const onUploadVideo = async () => {
        try {
            if (videoUri) {
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
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="w-full h-full items-center">
                    <View className="px-5 pt-10 pb-4 border-b-1 border-gray-300 w-full">
                        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
                            <View className="flex-row gap-2 items-center ">
                                <AntDesign name="left" size={20} color="gray" />
                                <Text className="color-slate-700 font-semibold">Post video</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <AudioVideo videoUri={videoUri} width={"w-44"} height={"h-80"} isPreview={true} />

                    <View className="w-full p-5 gap-4 items-start">
                        <View className="gap-2 w-full">
                            <Text>Title</Text>
                            <TextInput
                                className="bg-gray-200 rounded-md h-12 px-4 py-2"
                                placeholder="Enter your title"
                            />
                        </View>

                        <View className="gap-2 w-full">
                            <Text className="font-semibold text-slate-800 text-base">Description</Text>
                            <TextInput
                                className="bg-gray-200 rounded-md px-4 py-2"
                                placeholder="Enter your Description"
                                multiline={true}
                                numberOfLines={3}
                            />
                        </View>

                        <View className="gap-2 w-full">
                            <Text className="font-semibold text-slate-800 text-base">Add hashtag</Text>
                            <View className="w-full relative">
                                <View className="border border-gray-300">
                                    <TextInput
                                        className="bg-gray-200 rounded-md h-30 px-4 py-2"
                                        placeholder="Enter your hashtag"
                                        value={hashtagValue}
                                        onChangeText={setHashtagValue}
                                    />
                                </View>

                                <View className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <TouchableOpacity onPress={onAddHashTag}>
                                        <Ionicons name="send" size={18} color={hashtagValue ? "black" : "gray"} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View className="flex-row gap-3 flex-wrap w-full">
                            {hashtagList.length > 0 &&
                                hashtagList.map((hashtag, index) => (
                                    <View
                                        key={hashtag + index}
                                        className="bg-blue-200 flex-row gap-1 px-3 py-2 rounded-2xl items-center"
                                    >
                                        <Text className="text-blue-600">{hashtag}</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                removeHashtag(index);
                                            }}
                                        >
                                            <AntDesign name="close" size={18} color="#1E88E5" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                        </View>

                        <View className="flex-row justify-between w-full items-center">
                            <View className="flex-row gap-2 items-center">
                                <Text className="font-semibold text-slate-800 text-base">Tag someone</Text>
                                <View className="bg-blue-100 flex-row gap-1 py-2 px-4 rounded-2xl items-center justify-center">
                                    <Text className="text-blue-600">3 people</Text>
                                </View>
                            </View>
                            <AntDesign name="right" size={24} color="black" />
                        </View>

                        <View className="flex-row justify-between w-full items-center">
                            <Text className="font-semibold text-slate-800 text-base">Comments</Text>

                            <Switch
                                trackColor={{ false: "#bcc1ca", true: "#fbc8da" }}
                                thumbColor={allowComment ? "#f44b87" : "#9095a0"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={onToggleAllowComment}
                                value={allowComment}
                            />
                        </View>

                        <TouchableOpacity onPress={onToggleWatchModeDisplay}>
                            <View className="flex-row justify-between w-full items-center">
                                <Text className="font-semibold text-slate-800 text-base">Who can watch</Text>
                                <View className="flex-row items-center justify-between relative">
                                    <Modal
                                        animationType="fade"
                                        transparent={true}
                                        visible={isOpenWatchModeModal}
                                        onRequestClose={onToggleWatchModeDisplay}
                                    >
                                        <View className="w-2/3 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-xl shadow-gray rounded-md">
                                            <View className="w-full flex-row">
                                                <Text className="flex-1 text-slate-800 font-semibold text-lg">
                                                    Who can watch
                                                </Text>
                                                <TouchableOpacity onPress={onToggleWatchModeDisplay}>
                                                    <AntDesign name="close" size={18} color="gray" />
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                {watchModeList.map((watchModeItem, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => onSetWatchModeIndex(index)}
                                                    >
                                                        <View className="flex-row gap-1 mt-4">
                                                            <MaterialIcons
                                                                name={watchModeItem.icon}
                                                                size={20}
                                                                color="gray"
                                                            />
                                                            <Text className="text-gray-600">{watchModeItem.label}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    </Modal>

                                    <View className="flex-row gap-1 items-center">
                                        <MaterialIcons
                                            name={watchModeList[watchModeIndex].icon}
                                            size={20}
                                            color="gray"
                                        />
                                        <Text className="text-gray-600">{watchModeList[watchModeIndex].label}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View className="w-full">
                            <View className="flex-row justify-between items-center">
                                <View className="flex-row gap-2 items-center">
                                    <FontAwesome5 name="facebook" size={24} color="#197dca" />
                                    <Text className="color-slate-600">Facebook</Text>
                                </View>
                                <Switch
                                    trackColor={{ false: "#bcc1ca", true: "#fbc8da" }}
                                    thumbColor={shareFacebook ? "#f44b87" : "#9095a0"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={onToggleShareFacebook}
                                    value={shareFacebook}
                                />
                            </View>

                            <View className="flex-row justify-between items-center">
                                <View className="flex-row gap-2 items-center">
                                    <FontAwesome5 name="twitter" size={24} color="#379ae6" />
                                    <Text className="color-slate-600">Twitter</Text>
                                </View>
                                <Switch
                                    trackColor={{ false: "#bcc1ca", true: "#fbc8da" }}
                                    thumbColor={shareTwitter ? "#f44b87" : "#9095a0"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={onToggleShareTwitter}
                                    value={shareTwitter}
                                />
                            </View>

                            <View className="flex-row justify-between items-center">
                                <View className="flex-row gap-2 items-center">
                                    <FontAwesome5 name="instagram" size={24} color="#e1306c" />
                                    <Text className="color-slate-600">Instagram</Text>
                                </View>
                                <Switch
                                    trackColor={{ false: "#bcc1ca", true: "#fbc8da" }}
                                    thumbColor={shareInstagram ? "#f44b87" : "#9095a0"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={onToggleInstagram}
                                    value={shareInstagram}
                                />
                            </View>
                        </View>
                    </View>

                    <View className="flex-row gap-4 items-center justify-center p-4">
                        <TouchableOpacity onPress={onUploadVideo}>
                            <View className="bg-main px-4 py-3 rounded-md items-center justify-center flex-row w-40">
                                <Text className="color-white font-semibold">Save draft</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onUploadVideo}>
                            <View className="bg-main px-4 py-3 rounded-md items-center justify-center flex-row gap-2 w-40">
                                <FontAwesome name="send-o" size={18} color="white" />
                                <Text className="color-white font-semibold">Post on social</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
