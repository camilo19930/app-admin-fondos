import { useState } from "react";
import { useNavigate } from "react-router";
import { UserInterface } from "../interfaces/users.interface";
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
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

    const navigate = useNavigate();

    const handleCreate = () => {
        const data: UserInterface = {
            name: username,
            email: useremail,
            telefono: usertel,
            fondo_actual: [],
            historico: [],
            password: userpassword,
            saldo: parseFloat(usersaldo) || 0
        };
        userService.createUser(data).then((response: any) => {
            setAlertMessage(`Usuario creado correctamente. ${response?.data?.id}`);
            setAlertSeverity('success');
            setOpenAlert(true);
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }).catch((error: any) => {
            const messageError = error.response.data?.detail ? error.response.data?.detail : error.response.data?.mensaje;
            setAlertMessage(messageError);
            setAlertSeverity('error');
            setOpenAlert(true);
        })
    };

    return (
        <div className="registro-container">
            <h2>Registrarse</h2>
            <form className="registro-form">
                <div className="form-group">
                    <label htmlFor="username">Nombre:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingrese su nombre"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={useremail}
                        onChange={(e) => setUseremail(e.target.value)}
                        placeholder="Ingrese su correo"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="tel"
                        id="telefono"
                        value={usertel}
                        onChange={(e) => setUsertel(e.target.value)}
                        placeholder="Ingrese su teléfono"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="saldo">Saldo Inicial:</label>
                    <input
                        type="number"
                        id="saldo"
                        value={usersaldo}
                        onChange={(e) => setUsersaldo(e.target.value)}
                        placeholder="Ingrese el saldo"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={userpassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="Ingrese la contraseña"
                    />
                </div>
                <button type="button" className="btn-registrar" onClick={handleCreate}>
                    Registrarse
                </button>
                {openAlert && (
                    <div className={`alert ${alertSeverity}`}>
                        {alertMessage}
                    </div>
                )}
            </form>
        </div>
    );
}
