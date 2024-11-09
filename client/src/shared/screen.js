import { Feather } from "@expo/vector-icons";
import { privateTabs, tabs } from "./tabs";

export const screenOptions = ({ route }) => {
    let iconName = tabs.find((tab) => tab.name === route.name).icon;

    return {
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Feather name={iconName} size={size} color={color} />,
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "#F44B87",
        // tabBarItemStyle: {
        //     display: privateTabs[route.name] ? "none" : "block"
        // },
        tabBarLabelStyle: {
            paddingBottom: 4,
            fontSize: 10
        },
        tabBarStyle: [
            {
                display: "flex",
                paddingTop: 5
            },
            null
        ]
    };
};
