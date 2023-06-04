import axios from 'axios'
import Cookies from "js-cookie"

export const api = axios.create({
    baseURL: 'http://192.168.10.168:8800'
})

api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

