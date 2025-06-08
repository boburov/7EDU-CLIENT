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
    return res.data;
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

export const checkEmail = async (email: string) => {
    try {
        const res = await api.get(`user/check?email=${encodeURIComponent(email)}`);
        return res.data;
    } catch (err: any) {
        if (err.response?.status === 400) {
            return { exists: true };
        }
        throw new Error('Email tekshirishda xatolik');
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const res = await axios.get(`/auth/by-email?email=${encodeURIComponent(email)}`);

        if (res.status === 404) return null;

        // if (!res.ok) throw new Error('Server xatolik');

        return await res.data
    } catch (error) {
        console.error('Email tekshirishda xatolik:', error);
        return null;
    }
};
9
export const updateUser = async (id: string, data: object) => {
    try {
        const res = await api.patch(apiEndpoins.updateUser(id), data);
        return res.data.user;
    } catch (error) {
        console.error("updateUser error:", error);
        throw error;
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


// courses
export const allCourse = async () => {
    try {
        const allCourse = await api.get(apiEndpoins.allCourse);
        return allCourse.data;
    } catch (error) {
        console.log(error);
    }
};

export default api;
