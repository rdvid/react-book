import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config()

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 1000,
    headers: {'access-id': process.env.ACCESS_KEY}
})

export default axiosInstance;