import axios from 'axios';


const fileInstance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

fileInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default fileInstance;
