import React, { useEffect, useState } from "react";
import { getRentals, returnRental } from "./services/rentalService";

const GestionAlquilados = () => {
    const [alquileres, setAlquileres] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Función para cargar los alquileres desde la API
    const fetchAlquileres = async () => {
        setError("");
        try {
            const data = await getRentals(); // Llamada al servicio
            setAlquileres(data);
        } catch (err) {
            setError("Error al cargar los vehículos alquilados. Inténtalo nuevamente.");
        }
    };

    // Función para devolver un vehículo
    const handleDevolverVehiculo = async (id) => {
        setError("");
        setSuccess("");
        try {
            await returnRental(id); // Llamada al servicio para devolver el vehículo
            setSuccess("Vehículo devuelto con éxito.");
            fetchAlquileres(); // Actualizar la lista de alquileres
        } catch (err) {
            setError("Error al devolver el vehículo. Inténtalo nuevamente.");
        }
    };

    // Cargar los alquileres al montar el componente
    useEffect(() => {
        fetchAlquileres();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Gestión de Vehículos Alquilados</h1>

            {error && <div className="alert alert-danger text-center">{error}</div>}
            {success && <div className="alert alert-success text-center">{success}</div>}

            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Vehículo</th>
                    <th>Días de Alquiler</th>
                    <th>Fecha de Alquiler</th>
                    <th>Fecha de Devolución</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {alquileres.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center">
                            No hay vehículos alquilados actualmente.
                        </td>
                    </tr>
                ) : (
                    alquileres.map((alquiler) => (
                        <tr key={alquiler.rentalId}>
                            <td>{alquiler.user.username}</td>
                            <td>{alquiler.vehicle.model}</td>
                            <td>{alquiler.totalDays}</td>
                            <td>{new Date(alquiler.startDate).toLocaleDateString()}</td>
                            <td>{new Date(alquiler.endDate).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDevolverVehiculo(alquiler.rentalId)}
                                >
                                    Devolver
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default GestionAlquilados;
