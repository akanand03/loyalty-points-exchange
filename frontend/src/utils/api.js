import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5002/api', // Ensure the baseURL is correct
});

export default API;
