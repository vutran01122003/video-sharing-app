import "../../global.css";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenOptions } from "../../src/shared/screen";
import { tabs } from "../../src/shared/tabs";
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  
    return (
    
            <Tab.Navigator initialRouteName={tabs[0].name} screenOptions={screenOptions}>
                {tabs.map((tab) => (
                    <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
                ))}
            </Tab.Navigator>
       
    );
}
