import axiosInstance from './axiosInstance';

export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/auth/login', { username, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
};
