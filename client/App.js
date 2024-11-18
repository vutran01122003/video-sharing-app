import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/screens/MainApp";
import GlobalContextProvider from "./GlobalContext";
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GlobalContextProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="MainApp" component={TabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </GlobalContextProvider>
    );
}
