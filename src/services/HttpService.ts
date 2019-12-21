import axios from 'axios';
import {API_BASE_URL} from "../EnvConfig";

const HttpService = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export function setHttpServiceToken(token: string) {
    HttpService.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default HttpService;
