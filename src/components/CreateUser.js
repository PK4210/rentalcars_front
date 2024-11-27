import React, { useState } from 'react';
import { createUser } from '../services/userService';

const CreateUser = () => {
    const [user, setUser] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await createUser(user);
            setSuccess('Usuario creado exitosamente');
            setUser({ username: '', password: '', email: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Usuario"
                value={user.username}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={user.password}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Correo"
                value={user.email}
                onChange={handleChange}
                required
            />
            <button type="submit">Crear Usuario</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default CreateUser;
