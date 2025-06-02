// services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/', // backend URL'ni o‘zgartir
});

export default api;
