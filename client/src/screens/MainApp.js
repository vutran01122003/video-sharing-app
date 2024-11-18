import "../../global.css";
import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenOptions } from "../../src/shared/screen";
import { tabs } from "../../src/shared/tabs";
import { GlobalContext } from "../../GlobalContext";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const { user } = useContext(GlobalContext);
    let initialRouteName = user ? tabs[0].name : "Login";

    return (
        <Tab.Navigator initialRouteName={initialRouteName} screenOptions={screenOptions}>
            {tabs.map((tab) => (
                <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
            ))}
        </Tab.Navigator>
    );
}
