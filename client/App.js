import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenOptions } from "./src/shared/screen";
import { tabs } from "./src/shared/tabs";
import AudioVideo from "./src/components/video/AudioVideo";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        // <NavigationContainer>
        //     <Tab.Navigator initialRouteName={tabs[3].name} screenOptions={screenOptions}>
        //         {tabs.map((tab) => (
        //             <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
        //         ))}
        //     </Tab.Navigator>
        // </NavigationContainer>
        <AudioVideo videoUri="https://videostream.sirv.com/video/cktg.mp4"/>
    );
}
