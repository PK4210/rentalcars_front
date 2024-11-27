import React, { useState } from 'react';
import { createUser } from '../services/userService';

const CreateUser = () => {
    const [user, setUser] = useState({ username: '', password: '', email: '', userType: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await createUser(user);
            alert('Usuario creado exitosamente');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Usuario" onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <input type="email" placeholder="Correo" onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <button type="submit">Crear Usuario</button>
        </form>
    );
};

export default CreateUser;
