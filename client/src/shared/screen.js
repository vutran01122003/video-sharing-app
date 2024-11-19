import { Feather } from "@expo/vector-icons";
import { privateTabs, tabs } from "./tabs";

export const screenOptions = ({ route }) => {
    let iconName = tabs.find((tab) => tab.name === route.name).icon;

    const tabBarLabelStyle = {
        fontSize: 10,
        paddingBottom: 4
    };

    const tabBarStyle = [
        {
            display: privateTabs[route.name] ? "none" : "flex",
            paddingTop: 5,
            visibility: "hidden"
        },
        null
    ];

    const tabBarItemStyle = {
        display: "block"
    };

    return {
        tabBarStyle,
        tabBarItemStyle,
        tabBarLabelStyle,
        headerShown: false,
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "#F44B87",
        tabBarIcon: ({ color, size }) => <Feather name={iconName} size={size} color={color} />
    };
};
