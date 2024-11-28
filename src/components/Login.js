import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './services/authservice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            const userData = await login(username, password);
            localStorage.setItem('token', userData.token); // Guarda el token JWT
            alert('Inicio de sesión exitoso');
            navigate('/home'); // Redirige a Home
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
