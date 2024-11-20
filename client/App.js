import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/screens/MainApp";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import "./global.css";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="MainApp" component={TabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
