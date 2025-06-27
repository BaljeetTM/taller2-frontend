import axios from "axios";

const ApiBackend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Accept": "application/json, text/plain, /",
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export {ApiBackend};