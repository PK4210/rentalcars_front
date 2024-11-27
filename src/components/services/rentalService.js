import axiosInstance from './axiosInstance';

export const getRentals = async () => {
    const response = await axiosInstance.get('/rentals');
    return response.data;
};

export const createRental = async (rental) => {
    const response = await axiosInstance.post('/rentals', rental);
    return response.data;
};

export const returnRental = async (id) => {
    const response = await axiosInstance.put(`/rentals/return/${id}`);
    return response.data;
};

export const getRentalReport = async (startDate, endDate) => {
    const response = await axiosInstance.get('/rentals/report', {
        params: { startDate, endDate },
    });
    return response.data;
};
