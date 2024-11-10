import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreateVideoScreen from "../screens/CreateVideoScreen";
import SearchScreen from "../screens/SearchScreen";
import UploadVideoScreen from "../screens/UploadVideoScreen";
import AudioVideo from "../components/video/AudioVideo";
export const privateTabs = {
    Upload: {
        name: "Upload",
        icon: "upload",
        component: UploadVideoScreen
    },
    VideoAudio:{
        name: "VideoAudio",
        icon: "video",
        component:AudioVideo
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
        component: ProfileScreen
    },
    {
        name: "Profile",
        icon: "user",
        component: ProfileScreen
    },
    ...Object.values(privateTabs)
];
