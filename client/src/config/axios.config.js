import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
    baseURL: "http://192.168.0.102:8000/api",
    headers: { "Content-Type": "application/json" }
});

instance.interceptors.request.use(
    async function (config) {
        const token = await AsyncStorage.getItem("token");
        config.headers["x-token"] = token;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
