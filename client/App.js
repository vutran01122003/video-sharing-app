import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./src/components/layoutComponents/Header";
import HomeScreen from "./src/screens/HomeScreen";
import WatchingVideoScreen from "./src/screens/WatchingVideoScreen";
import StreamingVideoScreen from "./src/screens/StreamingVideoScreen";
import CreateVideoScreen from "./src/screens/CreateVideoScreen";
import UploadVideoScreen from "./src/screens/UploadVideoScreen";
import SearchVideoScreen from "./src/screens/SearchVideoScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import FollowScreen from "./src/screens/FollowScreen";

const Stack = createNativeStackNavigator();
const defaultOptions = { headerShown: false };

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={({ navigation, route }) => ({
                        header: () => <Header navigation={navigation} route={route} headerRight={true} />,
                    })}
                />
                <Stack.Screen name="UploadVideoScreen" component={UploadVideoScreen} options={defaultOptions} />
                <Stack.Screen name="CreateVideoScreen" component={CreateVideoScreen} options={defaultOptions} />
                <Stack.Screen name="SearchVideoScreen" component={SearchVideoScreen} options={defaultOptions} />
                <Stack.Screen name="WatchingVideoScreen" component={WatchingVideoScreen} options={defaultOptions} />
                <Stack.Screen name="StreamingVideoScreen" component={StreamingVideoScreen} options={defaultOptions} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={defaultOptions} />
                <Stack.Screen name="FollowScreen" component={FollowScreen} options={defaultOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
