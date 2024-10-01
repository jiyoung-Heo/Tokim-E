import axios from 'axios';

const API = axios.create({
    baseURL:  `${process.env.customKey}`,
    withCredentials: true,
});

export default API;
