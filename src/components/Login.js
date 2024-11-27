import React, { useState } from 'react';
import { login } from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            localStorage.setItem('user', JSON.stringify(data.User));
            alert('Inicio de sesión exitoso');
            window.location.href = '/vehicles';
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p>{error}</p>}
            <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    );
};

export default Login;
