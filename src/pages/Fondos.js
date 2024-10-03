import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getFund } from "../redux/FundSlide";
import { getUser } from "../redux/userSlide";
import { columnsfunds } from "../interfaces/funds.interface";
import { TableData } from "../components/TableData";
import fundService from "../services/fundService";
import transactionService from "../services/transactionService";
import userService from "../services/userService";
export function Fondos() {
    const [funds, setFunds] = useState([]);
    // @ts-ignore
    const [error, setError] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth);
    useEffect(() => {
        getFondos();
    }, []);
    const getFondos = async () => {
        fundService.getAllFunds().then((response) => {
            dispatch(getFund(response.data));
            return setFunds(response.data);
        }).catch((error) => {
            setError(error.toString());
        });
    };
    const handleOpening = (row, editedValue) => {
        const valorInicial = editedValue[row.id];
        if (valorInicial) {
            const data = {
                id: row?.id,
                name: row?.name,
                category: row?.category,
                minimum_amount: row?.minimum_amount,
                initial_amount: typeof valorInicial !== 'number' ? Number(valorInicial) : valorInicial
            };
            transactionService.subscritionFund(isAuthenticated.user?.id, data).then((response) => {
                getFondos();
                setAlertMessage(response?.data?.mensaje);
                setAlertSeverity('success');
                setOpenAlert(true);
                getUsers();
            }).catch((error) => {
                const messageError = error.response.data?.detail ? error.response.data?.detail : error.response.data?.mensaje;
                setAlertMessage(messageError);
                setAlertSeverity('error');
                setOpenAlert(true);
            });
        }
        else {
            setAlertMessage('Debe poner un valor inicial');
            setAlertSeverity('error');
            setOpenAlert(true);
        }
    };
    const getUsers = () => {
        userService.getUsersById(isAuthenticated.user.id).then((response) => {
            dispatch(getUser(response.data));
        }).catch((error) => {
            setError(error.toString());
        });
    };
    return (_jsxs(_Fragment, { children: [_jsx(TableData, { arrayColums: columnsfunds, dataRow: funds, isLoading: true, title: "Lista de Fondos", onOpening: handleOpening, displayName: "fondos", keyId: "id" }), openAlert && (_jsx("div", { className: `alert ${alertSeverity}`, children: alertMessage }))] }));
}
