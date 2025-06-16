import axios from "axios";

const ApiBackend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export {ApiBackend};