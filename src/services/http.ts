import axios from "axios";

export const http = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000'
            : process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
})