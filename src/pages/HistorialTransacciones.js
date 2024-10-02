import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { columnsHistory2 } from "../interfaces/funds.interface";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../redux/userSlide";
import { TableData } from "../components/TableData";
export function HistorialTransacciones() {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const [usersList, setUsersList] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth);
    useEffect(() => {
        if (isAuthenticated.user) {
            getUsers();
        }
    }, []);
    const getUsers = () => {
        axios
            .get(`${apiUrl}/users`)
            .then((response) => {
            dispatch(getUser(response.data));
            return setUsersList(response.data);
        })
            .catch(() => {
            setAlertMessage('Error al intentar cargar los datos.');
            setAlertSeverity('error'); // Alerta de error
            setOpenAlert(true);
        });
    };
    const enListDate = (data) => {
        const fondosActuales = data.flatMap((el) => el.historico);
        const modifiedHistorico = fondosActuales.map((fondo) => ({
            ...fondo,
            estado: fondo.estado ? 'Apertura' : 'Cancelación',
        }));
        return modifiedHistorico;
    };
    return (_jsxs(_Fragment, { children: [_jsx(TableData, { arrayColums: columnsHistory2, dataRow: enListDate(usersList), isLoading: true, title: "Historial Transacciones", displayName: 'historial', keyId: "historicoId" }), openAlert && (_jsx("div", { className: `alert ${alertSeverity}`, children: alertMessage }))] }));
}
