import apiEndpoins from '../api.endpoin';
import api from './api';

interface SignupData {
    name: string
    surname: string
    email: string;
    password: string;
}

interface LoginData {
    username: string;
    surname: string;
    userId: string;
}

export const authService = {

    signup: async (data: SignupData) => {
        try {
            const response = await api.post(apiEndpoins.registerUser, data);
            localStorage.setItem('email', data.email)
            return response.data;
        } catch (error) {
            throw error
        }
    },


    login: async (data: LoginData) => {
        try {
            const response = await api.post(apiEndpoins.loginUser, data);

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    verifyEmail: async (code: number) => {
        try {
            const email = localStorage.getItem('email')

            const response = await api.post(apiEndpoins.verifyCode, { email, code })
            
            console.log(response);


        } catch (error) {
            throw error
        }
    }
}

