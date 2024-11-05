import "./global.css";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import tabs from "./src/shared/tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const defaultOptions = { headerShown: false };

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={tabs[0].name}
                screenOptions={({ route }) => {
                    let iconName = tabs.find((tab) => tab.name === route.name).icon;

                    return {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => <Feather name={iconName} size={size} color={color} />,
                        tabBarInactiveTintColor: "grey",
                        tabBarActiveTintColor: "#F44B87",
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
                }}
            >
                {tabs.map((tab) => (
                    <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
}
