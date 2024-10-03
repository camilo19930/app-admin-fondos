import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { columnsHistory2 } from "../interfaces/funds.interface";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUser } from "../redux/userSlide";
import { TableData } from "../components/TableData";
import userService from "../services/userService";
export function HistorialTransacciones() {
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
    const enListDate = (data) => {
        if (data.length > 0) {
            const fondosActuales = data.flatMap((el) => el.historico);
            const modifiedHistorico = fondosActuales.map((fondo) => ({
                ...fondo,
                estado: fondo?.estado ? 'Apertura' : 'Cancelación',
            }));
            return modifiedHistorico;
        }
        else {
            return [];
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(TableData, { arrayColums: columnsHistory2, dataRow: enListDate([usersList]), isLoading: true, title: "Historial Transacciones", displayName: 'historial', keyId: "historicoId" }), openAlert && (_jsx("div", { className: `alert ${alertSeverity}`, children: alertMessage }))] }));
}
