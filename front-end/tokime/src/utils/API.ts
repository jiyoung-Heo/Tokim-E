import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_CUSTOM_KEY}`,
  withCredentials: true,
});

export default API;
