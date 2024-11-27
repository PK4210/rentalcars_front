import React from 'react';
import './Vehicles.css';

const VehiclesCard = ({ vehicle }) => {
    return (
        <div className="vehicle-card">
            <h2>{vehicle.model}</h2>
            <p><strong>Año:</strong> {vehicle.year}</p>
            <p><strong>Precio por día:</strong> ${vehicle.price}</p>
            <p><strong>Color:</strong> {vehicle.color}</p>
            <p><strong>Asientos:</strong> {vehicle.seats}</p>
            <p><strong>Placa:</strong> {vehicle.licensePlate}</p>
            <p><strong>Disponible:</strong> {vehicle.available ? 'Sí' : 'No'}</p>
        </div>
    );
};

export default VehiclesCard;
