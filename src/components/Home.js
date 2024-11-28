import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import VehicleCard from "./vehicles/VehiclesCard";
import RentVehicleModal from "./vehicles/RentVehicleModal.";
import { getVehicles } from "./services/vehicleService";
import { createRental } from "./services/rentalService";
import Navbar from "./NavBar";

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("all");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            } catch (error) {
                console.error("Error al decodificar el token:", error.message);
            }
        }
    }, []);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getVehicles();
                setVehicles(data);
                setFilteredVehicles(data);
            } catch (error) {
                console.error("Error al cargar vehículos:", error.message);
            }
        };

        fetchVehicles();
    }, []);

    const handleRentClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowModal(true);
    };

    const handleConfirmRent = async (vehicle, rentalDays) => {
        const currentDate = new Date();
        const endDate = new Date(currentDate);
        endDate.setDate(currentDate.getDate() + rentalDays);

        const rentalData = {
            userId: userId,
            vehicleId: vehicle.vehicleId,
            startDate: currentDate.toISOString(),
            endDate: endDate.toISOString(),
            totalDays: rentalDays,
            totalPrice: rentalDays * vehicle.price,
        };

        try {
            const response = await createRental(rentalData);
            console.log("Renta creada con éxito:", response);
            alert("Renta creada con éxito");
            setShowModal(false);
            window.location.reload();
        } catch (error) {
            console.error("Error al registrar el alquiler:", error.response?.data || error.message);
            alert("Error al registrar el alquiler. Verifica los datos e intenta de nuevo.");
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        filterVehicles(value, availabilityFilter);
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setAvailabilityFilter(value);
        filterVehicles(searchTerm, value);
    };

    const filterVehicles = (term, availability) => {
        let filtered = vehicles;

        if (term) {
            filtered = filtered.filter(
                (vehicle) =>
                    vehicle.model.toLowerCase().includes(term) ||
                    vehicle.color.toLowerCase().includes(term) ||
                    vehicle.seats.toString().includes(term)
            );
        }

        if (availability !== "all") {
            filtered = filtered.filter(
                (vehicle) => vehicle.available === (availability === "available")
            );
        }

        setFilteredVehicles(filtered);
    };

    return (
        <div>
            <Navbar />
            <div className="vehicles-container">
                <h1>Vehículos Disponibles</h1>

                {/* Barra de búsqueda y filtro */}
                <div className="row align-items-center mb-4">
                    <div className="col-3">
                        <select
                            className="form-select"
                            value={availabilityFilter}
                            onChange={handleFilterChange}
                        >
                            <option value="all">Todos</option>
                            <option value="available">Disponible</option>
                            <option value="unavailable">No Disponible</option>
                        </select>
                    </div>
                    <div className="col-9">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por modelo, color o asientos..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="vehicle-list">
                    {filteredVehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} onRentClick={handleRentClick} />
                    ))}
                </div>

                {/* Modal para alquilar */}
                {selectedVehicle && (
                    <RentVehicleModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        vehicle={selectedVehicle}
                        onConfirm={handleConfirmRent}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
