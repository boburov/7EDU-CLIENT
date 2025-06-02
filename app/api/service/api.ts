import axios from 'axios';
import apiEndpoins from '../api.endpoin';

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message ||
            "Noma'lum xatolik yuz berdi.";
        console.error("API Error:", message);


        return Promise.reject(message);
    }
);

export const getAllUser = async () => {
    try {
        const res = await api.get(apiEndpoins.getUsers)
        return res.data
    } catch (error) {
        console.log(error);

    }
}

export const register = async (data: Object) => {
    try {
        const res = await api.post(apiEndpoins.registerUser, data)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const verify = async (token: string, code: string) => {
    try {
        const res = await api.post(apiEndpoins.verifyCode, { token, code })
        return res
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (token: string) => {
    try {
        const res = await api.post(apiEndpoins.getUserById(token))
        return res
    } catch (error) {
        console.log(error)
    }

}

export default api
