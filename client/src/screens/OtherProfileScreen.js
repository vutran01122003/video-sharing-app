import Profile from "../components/user/Profile";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getVideosByUserId } from "../redux/actions/video.action";
import { userSelector, videoSelector } from "../redux/selector";
import { useIsFocused } from "@react-navigation/native";

export default function OtherProfileScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const screen = route.params?.screen;

    const user = useSelector(userSelector);
    const video = useSelector(videoSelector);

    const currentUser = user.currentUser;
    const videos = video.otherVideos;

    useEffect(() => {
        const backAction = async () => {
            navigation.navigate(screen);
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, [screen, isFocused]);

    useEffect(() => {
        if (currentUser)
            dispatch(
                getVideosByUserId({
                    userId: currentUser._id,
                    isAuthUser: false
                })
            );
    }, [currentUser]);

    return user ? <Profile user={currentUser} videos={videos} screen="OtherProfile" /> : null;
}
