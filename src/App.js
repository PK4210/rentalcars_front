import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Vehicles from "./components/vehicles/Vehicles";
import Login from "./components/Login";
import GestionAlquilados from "./components/gestionAlquilados";
import DevolucionVehiculos from "./components/DevolucionVehiculos";
import Reportes from "./components/Reportes";

const App = () => {
    const isAuthenticated = !!localStorage.getItem("token"); // Verifica si hay un token

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/vehicles" element={<Vehicles />} /> {/* Público */}
                <Route path="/login" element={<Login />} />
                <Route
                    path="/gestion-alquilados"
                    element={isAuthenticated ? <GestionAlquilados /> : <Navigate to="/login" />}
                />
                <Route path="/devolucion-vehiculos" element={<DevolucionVehiculos />} />
                <Route path="/reportes" element={<Reportes />} />
            </Routes>
        </Router>
    );
};

export default App;
