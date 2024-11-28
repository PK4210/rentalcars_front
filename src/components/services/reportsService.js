import axiosInstance from '../axiosInstance';

// Obtener vehículos rentados entre dos fechas
export const getRentedVehicles = async (startDate, endDate) => {
    try {
        const response = await axiosInstance.post('/reports/rented-vehicles', {
            StartDate: startDate,
            EndDate: endDate,
        }); // Enviar StartDate y EndDate directamente en el cuerpo
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener vehículos rentados');
    }
};

// Obtener rentas vencidas
export const getOverdueRentals = async () => {
    try {
        const response = await axiosInstance.get('/reports/overdue-rentals');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener rentas vencidas');
    }
};
