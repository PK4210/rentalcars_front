import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5039/api', // Cambia esto por la URL de tu API
    timeout: 5000, // Tiempo límite para la solicitud
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar tokens de autenticación (si es necesario)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtén el token desde localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Maneja errores de autenticación, por ejemplo, redirige al login
            console.error('No autorizado. Redirigiendo al login.');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
