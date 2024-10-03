import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router";
import './../styles/registro.css';
import userService from "../services/userService";
export function Registrarse() {
    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [usertel, setUsertel] = useState('');
    const [usersaldo, setUsersaldo] = useState('');
    const [userpassword, setUserPassword] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const navigate = useNavigate();
    const handleCreate = () => {
        const data = {
            name: username,
            email: useremail,
            telefono: usertel,
            fondo_actual: [],
            historico: [],
            password: userpassword,
            saldo: parseFloat(usersaldo) || 0
        };
        userService.createUser(data).then((response) => {
            setAlertMessage(`Usuario creado correctamente. ${response?.data?.id}`);
            setAlertSeverity('success');
            setOpenAlert(true);
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }).catch((error) => {
            const messageError = error.response.data?.detail ? error.response.data?.detail : error.response.data?.mensaje;
            setAlertMessage(messageError);
            setAlertSeverity('error');
            setOpenAlert(true);
        });
    };
    return (_jsxs("div", { className: "registro-container", children: [_jsx("h2", { children: "Registrarse" }), _jsxs("form", { className: "registro-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "username", children: "Nombre:" }), _jsx("input", { type: "text", id: "username", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Ingrese su nombre" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Correo Electr\u00F3nico:" }), _jsx("input", { type: "email", id: "email", value: useremail, onChange: (e) => setUseremail(e.target.value), placeholder: "Ingrese su correo" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "telefono", children: "Tel\u00E9fono:" }), _jsx("input", { type: "tel", id: "telefono", value: usertel, onChange: (e) => setUsertel(e.target.value), placeholder: "Ingrese su tel\u00E9fono" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "saldo", children: "Saldo Inicial:" }), _jsx("input", { type: "number", id: "saldo", value: usersaldo, onChange: (e) => setUsersaldo(e.target.value), placeholder: "Ingrese el saldo" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Contrase\u00F1a:" }), _jsx("input", { type: "password", id: "password", value: userpassword, onChange: (e) => setUserPassword(e.target.value), placeholder: "Ingrese la contrase\u00F1a" })] }), _jsx("button", { type: "button", className: "btn-registrar", onClick: handleCreate, children: "Registrarse" }), openAlert && (_jsx("div", { className: `alert ${alertSeverity}`, children: alertMessage }))] })] }));
}
