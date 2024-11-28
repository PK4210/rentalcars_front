import React, { useEffect, useState } from 'react';
import { getVehicles } from '../services/vehicleService'
import VehiclesCard from './VehiclesCard';
import './Vehicles.css';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getVehicles();
                setVehicles(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchVehicles();
    }, []);

    return (
        <div className="vehicles-container">
            <h1>Vehículos Disponibles</h1>
            <div className="vehicle-list">
                {vehicles.map((vehicle) => (
                    <VehiclesCard key={vehicle.vehicleId} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
};

export default Vehicles;
