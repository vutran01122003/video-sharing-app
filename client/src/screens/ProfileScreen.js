import { useSelector } from "react-redux";
import Profile from "../components/user/Profile";
import { authSelector, videoSelector } from "../redux/selector";
import { videoTypes } from "../shared";

export default function ProfileScreen({ navigation, route }) {
    const auth = useSelector(authSelector);
    const video = useSelector(videoSelector);

    const user = auth.user;
    const myVideos = video.myVideos;

    return user ? (
        <Profile user={user} videos={myVideos} isAuthUser={true} screen="Profile" videoType={videoTypes.MY_VIDEOS} />
    ) : null;
}
