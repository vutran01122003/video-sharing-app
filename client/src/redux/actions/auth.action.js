import AsyncStorage from "@react-native-async-storage/async-storage";
import { postDataApi } from "../../utils/fetchData";
import GLOBAL_TYPES from "./globalTypes";

export const register =
    ({ registerData, navigation }) =>
    async (dispatch) => {
        try {
            await postDataApi("/users/register", registerData);

            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: {
                    success: "Register successful"
                }
            });
            navigation.navigate("Login");
        } catch (error) {
            console.dir(error);
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: {
                    error: error.response?.data?.msg || "Register failed"
                }
            });
        }
    };

export const login = (loginData) => async (dispatch) => {
    try {
        const res = await postDataApi("/users/login", loginData);
        const { token, user } = res.data?.data;

        await AsyncStorage.setItem("token", token);

        dispatch({
            type: GLOBAL_TYPES.AUTH.LOGIN,
            payload: {
                token,
                user
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                success: "Login successful"
            }
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.msg || "Login failed"
            }
        });
    }
};

export const verifyToken = (token) => (dispatch) => {
    try {
    } catch (error) {}
};
