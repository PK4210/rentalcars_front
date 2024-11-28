import React, { useState, useEffect } from "react";

const RentVehicleModal = ({ show, onClose, vehicle, onConfirm }) => {
    const [rentalDays, setRentalDays] = useState(1);
    const [endDate, setEndDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(vehicle.price);

    // Actualizar precio total y fecha de fin según los días de alquiler
    useEffect(() => {
        const calculateEndDate = () => {
            const startDate = new Date();
            const calculatedEndDate = new Date(
                startDate.setDate(startDate.getDate() + rentalDays)
            );
            setEndDate(calculatedEndDate.toLocaleDateString());
            setTotalPrice(rentalDays * vehicle.price);
        };

        calculateEndDate();
    }, [rentalDays, vehicle.price]);

    const handleConfirm = () => {
        if (rentalDays > 0) {
            onConfirm(vehicle, rentalDays); // Envía el vehículo y los días al método padre
            onClose(); // Cierra el modal después de confirmar
        } else {
            alert("Por favor, ingresa un número válido de días.");
        }
    };


    if (!show) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Alquilar {vehicle.model}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body text-center">
                        {/* Imagen del vehículo */}
                        <img
                            src={vehicle.imageUrl}
                            alt={vehicle.model}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                marginBottom: "20px",
                            }}
                        />
                        <p><strong>Modelo:</strong> {vehicle.model}</p>
                        <p><strong>Precio por día:</strong> {new Intl.NumberFormat("es-PY", { style: "currency", currency: "PYG" }).format(vehicle.price)}</p>
                        <p><strong>Fecha de inicio:</strong> {new Date().toLocaleDateString()}</p>
                        <p><strong>Fecha de fin:</strong> {endDate}</p>
                        <div className="mb-3">
                            <label htmlFor="rentalDays" className="form-label">Días de alquiler:</label>
                            <input
                                type="number"
                                id="rentalDays"
                                className="form-control"
                                value={rentalDays}
                                onChange={(e) => setRentalDays(Number(e.target.value))}
                                min={1}
                            />
                        </div>
                        <p><strong>Precio total:</strong> {new Intl.NumberFormat("es-PY", { style: "currency", currency: "PYG" }).format(totalPrice)}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleConfirm}>
                            Confirmar Alquiler
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentVehicleModal;
