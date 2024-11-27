import React, { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleCard';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const autos = JSON.parse(localStorage.getItem('autos')) || [];
        setVehicles(autos);
    }, []);

    const handleRent = (vehicle) => {
        alert(`Alquilaste ${vehicle.model}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Nuestros Autos</h1>
            <div className="row">
                {vehicles.map((vehicle, index) => (
                    <VehicleCard key={index} vehicle={vehicle} onRent={handleRent} />
                ))}
            </div>
        </div>
    );
};

export default Home;
