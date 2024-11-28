import React, { useState } from "react";
import { getRentedVehicles, getOverdueRentals } from "./services/reportsService";
import "./Reportes.css";
import Navbar from "./NavBar";

const Reportes = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [rentedVehicles, setRentedVehicles] = useState([]);
    const [overdueRentals, setOverdueRentals] = useState([]);
    const [error, setError] = useState("");

    const handleFetchRentedVehicles = async () => {
        try {
            const formattedStartDate = new Date(startDate).toISOString();
            const formattedEndDate = new Date(endDate).toISOString();

            const data = await getRentedVehicles(formattedStartDate, formattedEndDate);
            setRentedVehicles(data);
            setError("");
        } catch (err) {
            setError("Error al obtener vehículos alquilados.");
            console.error(err.message);
        }
    };


    const handleFetchOverdueRentals = async () => {
        try {
            const data = await getOverdueRentals();
            setOverdueRentals(data);
            setError("");
        } catch (err) {
            setError("Error al obtener rentas vencidas.");
            console.error(err.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Reportes</h1>

                {error && <p className="text-danger">{error}</p>}

                <div className="report-section">
                    <h2>Vehículos Alquilados</h2>
                    <div className="row mb-3">
                        <div className="col">
                            <label>Fecha Inicio</label>
                            <input
                                type="date"
                                className="form-control"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label>Fecha Fin</label>
                            <input
                                type="date"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary mb-3" onClick={handleFetchRentedVehicles}>
                        Generar Reporte
                    </button>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Vehículo</th>
                            <th>Precio Total</th>
                            <th>Días</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rentedVehicles.length > 0 ? (
                            rentedVehicles.map((rental) => (
                                <tr key={rental.RentalId}>
                                    <td>{rental.User?.username || "Desconocido"}</td>
                                    <td>{rental.Vehicle?.model || "Desconocido"}</td>
                                    <td>
                                        {new Intl.NumberFormat("es-PY", {
                                            style: "currency",
                                            currency: "PYG",
                                        }).format(rental.TotalPrice)}
                                    </td>
                                    <td>{rental.TotalDays}</td>
                                    <td>{new Date(rental.StartDate).toLocaleDateString()}</td>
                                    <td>{new Date(rental.EndDate).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No hay datos disponibles.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="report-section">
                    <h2>Rentas Vencidas</h2>
                    <button className="btn btn-warning mb-3" onClick={handleFetchOverdueRentals}>
                        Generar Reporte de Vencidos
                    </button>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Vehículo</th>
                            <th>Días Vencidos</th>
                            <th>Fecha Fin</th>
                            <th>Precio Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rentedVehicles.map((rental) => (
                            <tr key={rental.RentalId}>
                                <td>{rental.User?.username || "Desconocido"}</td>
                                <td>{rental.Vehicle?.model || "Desconocido"}</td>
                                <td>
                                    {new Intl.NumberFormat("es-PY", {
                                        style: "currency",
                                        currency: "PYG",
                                    }).format(rental.TotalPrice || 0)}
                                </td>
                                <td>{rental.TotalDays || "N/A"}</td>
                                <td>{new Date(rental.StartDate).toLocaleDateString("es-ES")}</td>
                                <td>{new Date(rental.EndDate).toLocaleDateString("es-ES")}</td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reportes;
