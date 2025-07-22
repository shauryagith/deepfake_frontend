import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',  // Your FastAPI backend
  withCredentials: false,            // true if you're using cookies
});

export default API;


