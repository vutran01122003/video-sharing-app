import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, LogBox } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import "./global.css";
import store from "./src/redux/store";
import TabNavigator from "./src/screens/MainApp";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar barStyle="dark-content" translucent={false}></StatusBar>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="MainApp" component={TabNavigator} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
