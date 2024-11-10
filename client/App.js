import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import LoginScreen from "./src/screens/LoginScreen"
import SignUp from "./src/screens/SignUpScreen";
import TabNavigator from "./src/screens/MainApp";
const Stack = createNativeStackNavigator();

export default function App() { 
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                { !isAuthenticated ? (
                   <>
                         <Stack.Screen name="Login" component={LoginScreen} />
                         <Stack.Screen name="SignUp" component={SignUp} />
                   </>
                ):(
                        <Stack.Screen name="MainApp" component={TabNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
