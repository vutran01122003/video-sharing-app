import { Image, SafeAreaView } from "react-native";
import React from "react";
import LoadingLogo from "../../../assets/images/others/loading.gif";

function Loading() {
    return (
        <SafeAreaView className="w-full h-full z-50 justify-center items-center bg-gray-200/80">
            <Image source={LoadingLogo} style={{ height: 80, width: 80, resizeMode: "cover" }} />
        </SafeAreaView>
    );
}

export default Loading;
