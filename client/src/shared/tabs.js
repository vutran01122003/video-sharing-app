import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreateVideoScreen from "../screens/CreateVideoScreen";
import SearchScreen from "../screens/SearchScreen";
import UploadVideoScreen from "../screens/UploadVideoScreen";
import AudioVideo from "../components/video/AudioVideo";
import FollowScreen from "../screens/FollowScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUp from "../screens/SignUpScreen";

export const privateTabs = {
    Login: {
        name: "Login",
        icon: "lock",
        component: LoginScreen
    },
    SignUp: {
        name: "SignUp",
        icon: "lock",
        component: SignUp
    },
    Upload: {
        name: "Upload",
        icon: "upload",
        component: UploadVideoScreen
    },
    VideoAudio: {
        name: "VideoAudio",
        icon: "video",
        component: AudioVideo
    }
};

export const tabs = [
    {
        name: "Home",
        icon: "home",
        component: HomeScreen
    },
    {
        name: "Search",
        icon: "search",
        component: SearchScreen
    },
    {
        name: "Create",
        icon: "plus",
        component: CreateVideoScreen
    },
    {
        name: "Friends",
        icon: "users",
        component: FollowScreen
    },
    {
        name: "Profile",
        icon: "user",
        component: ProfileScreen
    },
    ...Object.values(privateTabs)
];
