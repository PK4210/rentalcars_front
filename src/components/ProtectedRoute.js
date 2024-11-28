import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Verifica si hay un token JWT

    if (!token) {
        return <Navigate to="/login" replace />; // Redirige al login si no hay token
    }

    return children; // Renderiza la ruta si hay token
};

export default ProtectedRoute;
