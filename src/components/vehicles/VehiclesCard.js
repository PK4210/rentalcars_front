import React, { useEffect, useState } from 'react';
import { getVehicles } from '../services/vehicleService';

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
        <div>
            <h1>Vehículos</h1>
            <ul>
                {vehicles.map((vehicle) => (
                    <li key={vehicle.vehicleId}>{vehicle.model}</li>
                ))}
            </ul>
        </div>
    );
};

export default Vehicles;
