import React, { useEffect, useState } from 'react';
import { getVehicles } from '../services/vehicleService';
import VehicleCard from './vehicles/VehiclesCard';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVehicles = async () => {
            setError('');
            try {
                const data = await getVehicles();
                setVehicles(data);
            } catch (err) {
                setError('Error al cargar los vehículos.');
                console.error(err.message);
            }
        };
        fetchVehicles();
    }, []);

    return (
        <div>
            <h1>Vehículos Disponibles</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="vehicle-list">
                {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
};

export default Home;
