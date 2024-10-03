import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { columnsHistory } from "../interfaces/funds.interface";
import { getUser } from "../redux/userSlide";
import { TableData } from "../components/TableData";
import transactionService from "../services/transactionService";
import userService from "../services/userService";
export function Cancelaciones() {
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
        userService.getUsersById(isAuthenticated.user.id).then((response) => {
            dispatch(getUser(response.data));
            return setUsersList(response.data);
        }).catch(() => {
            setAlertMessage('Error al intentar cargar los datos.');
            setAlertSeverity('error');
            setOpenAlert(true);
        });
    };
    const handleCancel = (row) => {
        const data = {
            historicoId: row?.historicoId,
        };
        transactionService.cancelFund(isAuthenticated.user?.id, data).then((response) => {
            getUsers();
            setAlertMessage(response?.data?.mensaje);
            setAlertSeverity('success');
            setOpenAlert(true);
        }).catch(() => {
            setAlertMessage('Error al intentar suscribirse al fondo.');
            setAlertSeverity('error');
            setOpenAlert(true);
        });
    };
    const enListDate = (data) => {
        if (data.length > 0) {
            const fondosActuales = data?.flatMap((el) => el.fondo_actual);
            const modifiedFondosActuales = fondosActuales.map((fondo) => ({
                ...fondo,
                estado: fondo?.estado ? 'Activo' : 'Cancelado',
            }));
            return modifiedFondosActuales;
        }
        else {
            return [];
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(TableData, { arrayColums: columnsHistory, dataRow: enListDate([usersList]), isLoading: true, title: "Lista de Fondos Actuales / Cancelaciones", onOpening: handleCancel, displayName: 'cancelaciones', keyId: "historicoId" }), openAlert && (_jsx("div", { className: `alert ${alertSeverity}`, children: alertMessage }))] }));
}
