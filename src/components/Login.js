import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './../styles/Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlide';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
export function Login() {
    const [userslist, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    useEffect(() => {
        axios
            .get(`${apiUrl}/users`)
            .then((response) => {
            dispatch(getUser(response.data));
            setUsers(response.data);
        })
            .catch((error) => {
            setError(error.toString());
        });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Por favor completa ambos campos');
            return;
        }
        setError('');
        const findUser = userslist?.find(el => el.email === username);
        if (findUser && (password === findUser.password)) {
            dispatch(login(findUser));
            navigate('/fondos');
        }
        else {
            setError('Por favor valide el correo y cantraseña');
        }
    };
    return (_jsx("div", { className: "login-container", children: _jsxs("form", { className: "login-form", onSubmit: handleSubmit, children: [_jsx("h2", { children: "Iniciar Sesi\u00F3n" }), error && _jsx("p", { className: "error-message", children: error }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "username", children: "Nombre de usuario" }), _jsx("input", { type: "text", id: "username", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Ingresa tu nombre de usuario" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Contrase\u00F1a" }), _jsx("input", { type: "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Ingresa tu contrase\u00F1a" })] }), _jsx("button", { type: "submit", children: "Ingresar" })] }) }));
}
;
