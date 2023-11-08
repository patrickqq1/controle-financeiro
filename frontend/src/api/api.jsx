import axios from 'axios'
import Cookies from "js-cookie"

export const api = axios.create({
    baseURL: process.env.URL_API
})

api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

