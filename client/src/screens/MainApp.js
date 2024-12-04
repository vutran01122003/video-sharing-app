import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "../../global.css";
import { tabs } from "../../src/shared/tabs";
import { authSelector } from "../redux/selector";
import { verifyToken } from "../redux/actions/auth.action";
import { screenOptions } from "../../src/shared/screen";
import { getVideosByUserId } from "../redux/actions/video.action";
import Loading from "../components/alert/Loading";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const dispatch = useDispatch();
    const isFocus = useIsFocused();

    const auth = useSelector(authSelector);
    const user = auth.user;

    const [isLoading, setIsLoading] = useState(true);

    let initialRouteName = user ? "Home" : "Login";

    useEffect(() => {
        Promise.resolve(dispatch(verifyToken())).finally(() => {
            setIsLoading(false);
        });
    }, [isFocus, dispatch]);

    useEffect(() => {
        if (user)
            dispatch(
                getVideosByUserId({
                    userId: user._id,
                    isAuthUser: true
                })
            );
    }, [dispatch, user]);

    if (isLoading) return <Loading />;

    return (
        <Tab.Navigator initialRouteName={initialRouteName} screenOptions={screenOptions}>
            {tabs.map((tab) => (
                <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
            ))}
        </Tab.Navigator>
    );
}
