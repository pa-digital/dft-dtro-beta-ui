import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'https://localhost:5001',
    headers: {
        "X-App-Id": import.meta.env.VITE_X_APP_ID,
        "X-Email": import.meta.env.VITE_X_EMAIL
    }
});

export default axiosInstance;