import axiosInstance from '../axiosInstance';

export const login = async (username, password) => {
    try {
        // Realiza la solicitud POST al endpoint de inicio de sesión
        const response = await axiosInstance.post('/auth/login', { username, password });

        // Retorna los datos del usuario
        return response.data;
    } catch (error) {
        // Verifica si el error tiene una respuesta del servidor
        if (error.response) {
            const errorMessage = error.response.data?.message || 'Error al iniciar sesión';
            throw new Error(errorMessage);
        }

        // Si no hay respuesta del servidor, lanza un error genérico
        throw new Error('No se pudo conectar con el servidor. Por favor, intenta nuevamente.');
    }
};