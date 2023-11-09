import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';
import { localStorageHelper } from "../helpers/localStorageHelper";


const apiPORT = process.env.REACT_APP_API_PORT;
export const BASE_URL = process.env.REACT_APP_API_URL ||  `http://localhost:${apiPORT}`;


const client = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,    
});

client.interceptors.request.use( (config: InternalAxiosRequestConfig) => {
    if (config.method === 'post' &&  config.baseURL === `${BASE_URL}` && config.url === '/') {
        const token = localStorageHelper.getItem("TOKEN");
        const connectionId = localStorageHelper.getItem("CONNECTION_ID");

        if (connectionId) {            
            Cookies.set('connectionId', connectionId , { expires: 7, sameSite: 'None', path: '/' });
        }

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
    return config;
});

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

