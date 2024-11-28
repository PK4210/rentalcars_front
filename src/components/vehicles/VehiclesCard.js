import React from "react";
import "./Vehicles.css";

const VehiclesCard = ({ vehicle, onRentClick }) => {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage

    return (
        <div className="vehicle-card">
            <h2>{vehicle.model}</h2>
            <img src={vehicle.imageUrl} alt={vehicle.model} />
            <p><strong>Año:</strong> {vehicle.year}</p>
            <p><strong>Precio por día:</strong> {new Intl.NumberFormat("es-PY", { style: "currency", currency: "PYG" }).format(vehicle.price)}</p>
            <p><strong>Color:</strong> {vehicle.color}</p>
            <p><strong>Asientos:</strong> {vehicle.seats}</p>
            <p><strong>Placa:</strong> {vehicle.licensePlate}</p>
            <button
                className={`btn ${vehicle.available && token ? "btn-primary" : "btn-secondary"}`}
                disabled={!vehicle.available || !token} // Deshabilitar si no está disponible o no hay token
                onClick={vehicle.available && token ? () => onRentClick(vehicle) : null}
            >
                {vehicle.available
                    ? (token ? "Alquilar" : "Inicia sesión para alquilar")
                    : "No Disponible"}
            </button>
        </div>
    );
};

export default VehiclesCard;
