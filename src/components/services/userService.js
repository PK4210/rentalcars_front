import axiosInstance from './axiosInstance';

export const getUsers = async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
};

export const createUser = async (user) => {
    const response = await axiosInstance.post('/users/createuser', user);
    return response.data;
};

export const createUserAdmin = async (user) => {
    const response = await axiosInstance.post('/users/admin/createuser', user);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
};

export const getCommonUsers = async (id) => {
    const response = await axiosInstance.get(`/users/commonusers`);
    return response.data;
};

export const getAdmins = async (id) => {
    const response = await axiosInstance.get(`/users/admins`);
    return response.data;
};