import "../../global.css";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenOptions } from "../../src/shared/screen";
import { tabs } from "../../src/shared/tabs";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/selector";
import { getVideoByUserId } from "../redux/actions/video.action";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const dispatch = useDispatch();

    const auth = useSelector(authSelector);
    const user = auth.user;

    let initialRouteName = user ? "Home" : "Login";

    useEffect(() => {
        if (user) dispatch(getVideoByUserId(user._id));
    }, [dispatch, user]);

    return (
        <Tab.Navigator initialRouteName={initialRouteName} screenOptions={screenOptions}>
            {tabs.map((tab) => (
                <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
            ))}
        </Tab.Navigator>
    );
}
