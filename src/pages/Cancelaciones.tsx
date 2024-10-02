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
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (isAuthenticated.user) {
            getUsers();
        }

    }, []);

    const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
        console.log(event)
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const getUsers = () => {
        axios
            .get(`${apiUrl}/users`)
            .then((response: any) => {
                dispatch(getUser(response.data));
                return setUsersList(response.data);
            })
            .catch(() => {
                setAlertMessage('Error al intentar cargar los datos.', );
                setAlertSeverity('error');  // Alerta de error
                setOpenAlert(true);
            });
    }
    const handleCancel = (row: any) => {

        const data = {
            historicoId: row?.historicoId,
        }
        const url = `${apiUrl}/transaction/cancelar_fondo/${isAuthenticated.user?.id}`

        axios.put(url, data)
            .then((response: any) => {
                  getUsers();
                setAlertMessage(response?.data?.mensaje);
                setAlertSeverity('success');  // Alerta de éxito
                setOpenAlert(true);
            })
            .catch(() => {
                setAlertMessage('Error al intentar suscribirse al fondo.');
                setAlertSeverity('error');  // Alerta de error
                setOpenAlert(true);
            });
    }
    const enListDate = (data: any) => {
        const fondosActuales = data.flatMap((el: any) => el.fondo_actual);
        const modifiedFondosActuales = fondosActuales.map((fondo: any) => ({
            ...fondo,
            estado: fondo.estado ? 'Activo' : 'Cancelado',
        }));
        return modifiedFondosActuales;
    }

    return (
        <>
            <TableData arrayColums={columnsHistory} dataRow={enListDate(usersList)} isLoading={true} title="Lista de Fondos Actuales / Cancelaciones"
                onOpening={handleCancel} displayName='cancelaciones' keyId="historicoId"
            ></TableData>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )
}