import axios from 'axios';
import apiEndpoins from '../api.endpoin';

const api = axios.create({
    baseURL: 'http://localhost:3000/',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
    }

    return config;
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

export const updateUserProfilePic = async (userId: string, formData: FormData) => {
    try {
        const response = await api.post(apiEndpoins.updateUserProfilePic(userId), formData);
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllUser = async () => {
    try {
        const res = await api.get(apiEndpoins.getUsers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const register = async (data: object) => {
    const res = await api.post(apiEndpoins.registerUser, data);
    localStorage.setItem('token', res.data.token);
    return res.data;
};

export const verifyCode = async (data: object) => {
    const res = await api.post(apiEndpoins.verifyCode, data);
    localStorage.setItem('token', res.data.token);
    return res.data;
};

export const login = async (data: object) => {
    const res = await api.post(apiEndpoins.loginUser, data);
    localStorage.setItem('token', res.data.token);
    console.log(res.data);
    return res.data;
};

export const decodeToken = async (token: string) => {
    try {
        const res = await api.post(apiEndpoins.decodeToken, { token });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserById = async (id: string) => {
    try {
        const res = await api.get(apiEndpoins.getUserById(id));
        return res.data;
    } catch (error) {
        console.log(`Bu foydalanuvchi topilmadi`);
    }
};

export const getMe = async () => {
    try {
        const res = await api.get(apiEndpoins.getMe);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const allCourse = async () => {
    try {
        const allCourse = await api.get(apiEndpoins.allCourse);
        return allCourse.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const res = await api.get(`/user/by-email`, {
            params: { email },
        });
        return res.data;
    } catch (err) {
        console.log("User topilmadi:", err);
    }
};

export const updateUser = async (id: string, data: object) => {
    try {
        const res = await api.patch(apiEndpoins.updateUser(id), data);
        return res.data;
    } catch (error) {
        console.log(`Bu foydalanuvchi topilmadi`);
    }
};

export const deleteUserProfilePic = async (userId: string) => {
    try {
        const response = await api.delete(`/user/deleteProfilePic/${userId}`);
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};

export default api;
