import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const token = localStorage.getItem("token"); // Obtén el token
    const isAuthenticated = !!token; // Verifica si el token existe
    const user = token ? JSON.parse(atob(token.split(".")[1])) : null; // Decodifica el token para obtener datos del usuario
    const isAdmin = user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Admin"; // Verifica si el usuario es administrador

    const handleLogout = () => {
        localStorage.removeItem("token"); // Elimina el token
        alert("Sesión cerrada con éxito.");
        window.location.href = "/home"; // Redirige a Home
    };

    return (
        <nav className="navbar navbar-expand-lg bg-light py-3">
            <div className="container-fluid">
                <Link className="navbar-brand fs-3" to="/home">
                    PK Cars
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#NavbarRental"
                    aria-controls="NavbarRental"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="NavbarRental">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fs-5" to="/home">
                                Inicio
                            </Link>
                        </li>
                        {isAuthenticated && isAdmin && (
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle fs-5"
                                    to="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Admin
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/devolucion-vehiculos"
                                        >
                                            Devolución de Vehículos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/reportes"
                                        >
                                            Reportes
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                    {isAuthenticated ? (
                        <button
                            className="btn btn-danger btn-lg"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    ) : (
                        <Link className="btn btn-primary btn-lg" to="/login">
                            Iniciar sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
