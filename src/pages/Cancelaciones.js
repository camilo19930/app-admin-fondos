import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { columnsHistory } from "../interfaces/funds.interface";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { getUser } from "../redux/userSlide";
import { TableData } from "../components/TableData";
export function Cancelaciones() {
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
    const handleCloseAlert = (event, reason) => {
        console.log(event);
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
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
    const handleCancel = (row) => {
        const data = {
            historicoId: row?.historicoId,
        };
        const url = `${apiUrl}/transaction/cancelar_fondo/${isAuthenticated.user?.id}`;
        axios.put(url, data)
            .then((response) => {
            getUsers();
            setAlertMessage(response?.data?.mensaje);
            setAlertSeverity('success'); // Alerta de éxito
            setOpenAlert(true);
        })
            .catch(() => {
            setAlertMessage('Error al intentar suscribirse al fondo.');
            setAlertSeverity('error'); // Alerta de error
            setOpenAlert(true);
        });
    };
    const enListDate = (data) => {
        const fondosActuales = data.flatMap((el) => el.fondo_actual);
        const modifiedFondosActuales = fondosActuales.map((fondo) => ({
            ...fondo,
            estado: fondo.estado ? 'Activo' : 'Cancelado',
        }));
        return modifiedFondosActuales;
    };
    return (_jsxs(_Fragment, { children: [_jsx(TableData, { arrayColums: columnsHistory, dataRow: enListDate(usersList), isLoading: true, title: "Lista de Fondos Actuales / Cancelaciones", onOpening: handleCancel, displayName: 'cancelaciones', keyId: "historicoId" }), _jsx(Snackbar, { open: openAlert, autoHideDuration: 6000, onClose: handleCloseAlert, children: _jsx(Alert, { onClose: handleCloseAlert, severity: alertSeverity, sx: { width: '100%' }, children: alertMessage }) })] }));
}
