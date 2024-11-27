import axiosInstance from './axiosInstance';

export const getRentals = async () => {
    try {
        const response = await axiosInstance.get('/rentals');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener rentas');
    }
};

export const createRental = async (rental) => {
    try {
        const response = await axiosInstance.post('/rentals', rental);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al crear renta');
    }
};

export const returnRental = async (id) => {
    try {
        const response = await axiosInstance.put(`/rentals/return/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al finalizar renta');
    }
};

export const getRentalReport = async (startDate, endDate) => {
    try {
        const response = await axiosInstance.get('/rentals/report', {
            params: { startDate, endDate },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al generar informe de rentas');
    }
};
