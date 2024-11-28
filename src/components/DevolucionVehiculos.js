import React, { useState, useEffect } from "react";
import { getRentals, returnRental } from "./services/rentalService"; // Servicios para obtener y devolver vehículos
import Navbar from "./NavBar"; // Componente Navbar
import "./DevolucionVehiculos.css"; // Archivo CSS opcional para estilos

const DevolucionVehiculos = () => {
    const [rentals, setRentals] = useState([]);
    const [error, setError] = useState("");

    // Obtener los alquileres al cargar la página
    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const data = await getRentals();
                console.log("Rentals data:", data); // Para depuración
                setRentals(data);
            } catch (err) {
                setError("Error al cargar los alquileres.");
                console.error(err.message);
            }
        };

        fetchRentals();
    }, []);

    // Manejar la devolución de un vehículo
    const handleReturn = async (rentalId) => {
        if (!window.confirm("¿Está seguro de que desea devolver este vehículo?")) {
            return;
        }

        try {
            await returnRental(rentalId);
            alert("Vehículo devuelto con éxito.");
            setRentals(rentals.filter((rental) => rental.rentalId !== rentalId));
        } catch (err) {
            setError("Error al devolver el vehículo.");
            console.error(err.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Devolución de Vehículos Alquilados</h1>
                {error && <p className="text-danger">{error}</p>}
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Modelo</th>
                        <th>Chapa</th>
                        <th>Días</th>
                        <th>Precio Total</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rentals.length > 0 ? (
                        rentals.map((rental) => (
                            <tr key={rental.rentalId}>
                                <td>{rental.user.username}</td>
                                <td>{rental.vehicle.model}</td>
                                <td>{rental.vehicle.licensePlate}</td>
                                <td>{rental.totalDays}</td>
                                <td>
                                    {new Intl.NumberFormat("es-PY", {
                                        style: "currency",
                                        currency: "PYG",
                                    }).format(rental.totalPrice)}
                                </td>
                                <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                                <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleReturn(rental.rentalId)}
                                    >
                                        Devolver
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">
                                No hay vehículos alquilados actualmente.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DevolucionVehiculos;
