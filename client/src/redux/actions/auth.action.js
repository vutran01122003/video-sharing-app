import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDataApi, postDataApi } from "../../utils/fetchData";
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
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.msg || "Login failed"
            }
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem("token");
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.msg || "Logout failed"
            }
        });
    }
};

export const verifyToken = () => async (dispatch) => {
    try {
        const res = await getDataApi("/users/verify-token");

        dispatch({
            type: GLOBAL_TYPES.AUTH.VERIFY_TOKEN,
            payload: { user: res.data.data }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.msg || "Login again"
            }
        });
    }
};
