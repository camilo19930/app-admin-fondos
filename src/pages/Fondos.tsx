import { useEffect, useState } from "react";
import axios from 'axios';
import TableData from "../components/TableData.tsx";
import { columnsfunds } from "../interfaces/funds.interface.ts";
import { useDispatch } from "react-redux";
import { getFund } from "../redux/FundSlide.ts";
import { useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export function Fondos() {
  const [funds, setFunds] = useState([]);
  const [error, setError] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.auth);


  useEffect(() => {
    getFondos();
  }, []);

  const getFondos = () => {
    axios
      .get('http://127.0.0.1:8000/funds')
      .then((response) => {
        dispatch(getFund(response.data));
        return setFunds(response.data);
      })
      .catch((error) => {
        setError(error.toString());
      });
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);  // Cerrar la alerta
  };
  const handleOpening = (row: any) => {
    console.log('Eliminando Abierto:', row);
    const data = {
      id: row?.id,
      name: row?.name,
      category: row?.category,
      minimum_amount: row?.minimum_amount,
      // initial_amount: isAuthenticated.user?.saldo ? isAuthenticated.user?.saldo : 0
      initial_amount: 1000000
    }
    const url = `http://127.0.0.1:8000/transaction/fondo_actual/${isAuthenticated.user?.id}`

    axios.put(url, data)
      .then((response) => {
        console.log('Registro actualizado:', response.data);
        getFondos();
        setAlertMessage('Fondo actualizado con éxito.');
        setAlertSeverity('success');  // Alerta de éxito
        setOpenAlert(true);
      })
      .catch((error) => {
        console.error('Error actualizando el registro:', error);
        setAlertMessage('Error al actualizar el fondo.');
        setAlertSeverity('error');  // Alerta de error
        setOpenAlert(true);
      });


  };
  const handleCancel = (row: any) => {
    console.log('Eliminando fondo:', row);
    // Implementa aquí la lógica de eliminación del fondo
  };
  return (
    <>
      <TableData arrayColums={columnsfunds} dataRow={funds} isLoading={true} title="Lista de Fondos"
        onOpening={handleOpening} onCancel={handleCancel}
      ></TableData>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  )
}