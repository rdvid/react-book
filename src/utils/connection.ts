import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_TEST,
    timeout: 30000,
    headers: {
        'access-id': import.meta.env.VITE_ACCESS_KEY, 
        'Content-Type': 'multipart/form-data'
    }
})

export default axiosInstance;

