import axios from "axios";
import { AxiosHeaders } from "axios";

export const http = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000'
            : process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});

http.interceptors.request.use((config) => {
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId) {
        config.headers = AxiosHeaders.from(config.headers ?? {});
        config.headers.set("x-session-id", sessionId);
    }

    return config;
});