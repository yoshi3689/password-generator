import axios from 'axios';

export const passwords = axios.create({
    baseURL: "http://localhost:3001"
});
// wrong https://localhost:3001
// correct http://localhost:3001