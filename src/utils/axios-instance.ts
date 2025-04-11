import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://localhost:5001',
    withCredentials: true
});

export default axiosInstance;