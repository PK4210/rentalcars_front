import axiosInstance from '../axiosInstance';

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener usuarios');
    }
};

export const createUser = async (user) => {
    try {
        const response = await axiosInstance.post('/users/createuser', user);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al crear usuario');
    }
};

export const createUserAdmin = async (user) => {
    try {
        const response = await axiosInstance.post('/users/admin/createuser', user);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al crear administrador');
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al eliminar usuario');
    }
};

export const getCommonUsers = async () => {
    try {
        const response = await axiosInstance.get(`/users/commonusers`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener usuarios comunes');
    }
};

export const getAdmins = async () => {
    try {
        const response = await axiosInstance.get(`/users/admins`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener administradores');
    }
};
