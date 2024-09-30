import { useEffect, useState } from "react";
import { columnsHistory, columnsHistory2 } from "../interfaces/funds.interface";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../redux/userSlide";
import { Alert, Snackbar } from "@mui/material";
import { TableData } from "../components/TableData";

export function HistorialTransacciones() {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const [usersList, setUsersList] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: any) => state.auth);

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
            .catch((error) => {
                setAlertMessage('Error al intentar cargar los datos.');
                setAlertSeverity('error');  // Alerta de error
                setOpenAlert(true);
            });
    }
    const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    const enListDate = (data: any) => {
        const fondosActuales = data.flatMap((el: any) => el.historico);
        const modifiedHistorico = fondosActuales.map((fondo: any) => ({
            ...fondo,
            estado: fondo.estado ? 'Apertura' : 'Cancelación',
        }));
        return modifiedHistorico;
    }



    return (
        <>
            <TableData arrayColums={columnsHistory2} dataRow={enListDate(usersList)}
                isLoading={true} title="Historial Transacciones" displayName='historial' keyId="historicoId"
            ></TableData>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )

}