import axios from 'axios'
import Cookies from "js-cookie"

export const api = axios.create({
    baseURL: 'https://back-financ.onrender.com'
})

api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

