import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">PK Cars</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#NavbarRental"
                    aria-controls="NavbarRental"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="NavbarRental">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">
                                Admin
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/manage-rentals">Gestión de Vehículos Alquilados</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <button className="btn btn-danger" onClick={() => localStorage.removeItem('user')}>Cerrar sesión</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;