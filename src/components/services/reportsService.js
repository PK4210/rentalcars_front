import axiosInstance from './axiosInstance';

export const getRentedVehicles = async (startDate, endDate) => {
    const response = await axiosInstance.get('/reports/rentedvehicles', {
        params: { startDate, endDate },
    });
    return response.data;
};

export const getOverdueRentals = async () => {
    const response = await axiosInstance.get('/reports/overduerentals');
    return response.data;
};
