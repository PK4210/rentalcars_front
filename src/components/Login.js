import React, { useState } from 'react';
import { login } from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            const userData = await login(username, password);
            localStorage.setItem('user', JSON.stringify(userData));
            alert('Inicio de sesión exitoso');
            window.location.href = '/';
        } catch (err) {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
