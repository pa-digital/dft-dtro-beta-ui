import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'https://localhost:5001',
    withCredentials: true,
    headers: {
        "App-Id": import.meta.env.VITE_APP_ID,
        "Email": import.meta.env.VITE_EMAIL
    }
});

export default axiosInstance;