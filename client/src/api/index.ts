import axios, { InternalAxiosRequestConfig } from "axios";

export const BASE_URL = 'http://localhost:8000';


const client = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,    
});

client.interceptors.request.use( (config: InternalAxiosRequestConfig) => {
    if (config.method === 'post' &&  config.baseURL === `${BASE_URL}` && config.url === '/') {
        const token = localStorage.getItem('token');
        if (token) {
            const parsedToken = JSON.parse(token);
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${parsedToken}`;
        }
        return config;
    }
    return config;
})

client.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        if (!error.response) {
            return Promise.reject({message: 'Site is not available. Try again later.'});
        }
        return Promise.reject(error.response.data);
    }
)
export default client;

