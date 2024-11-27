import { Image, SafeAreaView } from "react-native";
import React from "react";
import LoadingLogo from "../../../assets/images/others/loading.gif";

function Loading() {
    return (
        <SafeAreaView className="bg-white h-full w-full justify-center items-center">
            <Image source={LoadingLogo} style={{ height: 200, width: 200, resizeMode: "cover" }} />
        </SafeAreaView>
    );
}

export default Loading;
