import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.openweathermap.org'
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

export default axiosInstance;