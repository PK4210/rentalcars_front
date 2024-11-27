import axiosInstance from './axiosInstance';

export const getVehicles = async () => {
    try {
        const response = await axiosInstance.get('/vehicles');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener vehículos');
    }
};

export const createVehicle = async (vehicle) => {
    try {
        const response = await axiosInstance.post('/vehicles', vehicle);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al crear vehículo');
    }
};

export const filterVehicles = async (filters) => {
    try {
        const response = await axiosInstance.get('/vehicles/filter', { params: filters });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al filtrar vehículos');
    }
};

export const updateVehicle = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/vehicles/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al actualizar vehículo');
    }
};
