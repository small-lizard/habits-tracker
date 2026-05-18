import axios from "axios";

export const http = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000'
            : process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
})

http.interceptors.request.use((config) => {
    const sessionId = localStorage.getItem('sessionId');
    const userId = localStorage.getItem('userId');

    if (sessionId && userId) {
        if(config.method === 'get' ){
            config.params = {
                ...config.params,
                sessionId,
                userId,
            }
        } else {
            config.data = {
                ...config.data,
                sessionId,
                userId,
            }
        }
    }

    return config;
});