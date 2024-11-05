import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreateVideoScreen from "../screens/CreateVideoScreen";
import SearchScreen from "../screens/SearchScreen";

const tabs = [
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
        name: "My profile",
        icon: "user",
        component: ProfileScreen
    }
];

export default tabs;
