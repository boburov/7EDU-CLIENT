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

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


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

export const verify = async (email: string, code: string) => {
    try {
        const res = await api.post(apiEndpoins.verifyCode, { email, code })
        return res
    } catch (error) {
        console.log(error);
    }
}

export const decodeToken = async (token: string) => {
    try {
        const res = await api.post(apiEndpoins.decodeToken, token)
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
        const allCourse = await api.get(apiEndpoins.allCourse).then((elem) => {
            return elem.data
        })
        return allCourse
    } catch (error) {
        console.log(error)
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const res = await api.get(`/user/by-email?email=${email}`);
        return res.data;
    } catch (err) {
        console.log("User topilmadi:", err);
    }
};


export default api
