import axios from "axios";

const instance = axios.create({
    baseURL: "https://671220454eca2acdb5f731f2.mockapi.io/api",
    headers: { "Content-Type": "application/json" },
});

export default instance;
