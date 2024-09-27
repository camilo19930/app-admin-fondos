
import React, { useEffect, useState } from 'react';
import './../styles/Login.css'; // Archivo de estilo para el login
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlide';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [userslist, setUsers] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/users`)
      .then((response) => {
        dispatch(getUser(response.data));
        setUsers(response.data);
      })
      .catch((error) => {
        setError(error.toString());
      });
    }, []);   


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor completa ambos campos');
      return;
    }
    setError('');
    const findUser = userslist.find(el => el.email === username);
    if(findUser && (password === findUser.password)) {
      dispatch(login(findUser));
      navigate('/fondos'); 
    } else {
      setError('Por favor valide el correo y cantraseña');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre de usuario"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};