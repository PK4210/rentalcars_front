import axiosInstance from './axiosInstance';

export const getVehicles = async () => {
    const response = await axiosInstance.get('/vehicles');
    return response.data;
};

export const createVehicle = async (vehicle) => {
    const response = await axiosInstance.post('/vehicles', vehicle);
    return response.data;
};

export const filterVehicles = async (filters) => {
    const response = await axiosInstance.get('/vehicles/filter', { params: filters });
    return response.data;
};

export const updateVehicle = async (id, data) => {
    const response = await axiosInstance.put(`/vehicles/${id}`, data);
    return response.data;
};
