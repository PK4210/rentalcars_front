import axiosInstance from '../axiosInstance';

export const getRentedVehicles = async (startDate, endDate) => {
    try {
        const response = await axiosInstance.get('/reports/rentedvehicles', {
            params: { startDate, endDate },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener vehículos rentados');
    }
};

export const getOverdueRentals = async () => {
    try {
        const response = await axiosInstance.get('/reports/overduerentals');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener rentas vencidas');
    }
};
