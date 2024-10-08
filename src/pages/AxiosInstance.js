import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
         console.log("AxiosInstane-Token",token)
        if (token) {
            config.headers['Authorization' || 'authorization' ]  = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
