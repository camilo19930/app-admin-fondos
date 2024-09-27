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
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false); 
  };
  const handleOpening = (row: any, editedValue:any) => {
    const valorInicial = editedValue[row.id]
    const data = {
      id: row?.id,
      name: row?.name,
      category: row?.category,
      minimum_amount: row?.minimum_amount,
      // initial_amount: isAuthenticated.user?.saldo ? isAuthenticated.user?.saldo : 0
      initial_amount: typeof valorInicial !== 'number' ? Number(valorInicial) : valorInicial
    }
    const url = `http://127.0.0.1:8000/transaction/fondo_actual/${isAuthenticated.user?.id}`

    axios.put(url, data)
      .then((response) => {
        getFondos();
        setAlertMessage(response?.data?.mensaje);
        setAlertSeverity('success');  // Alerta de éxito
        setOpenAlert(true);
      })
      .catch((error) => {
        const messageError = error.response.data?.detail ? error.response.data?.detail : error.response.data?.mensaje
        setAlertMessage(messageError);
        setAlertSeverity('error');  // Alerta de error
        setOpenAlert(true);
      });


  };
  return (
    <>
      <TableData arrayColums={columnsfunds} dataRow={funds} isLoading={true} title="Lista de Fondos"
        onOpening={handleOpening} displayName="fondos"
      ></TableData>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  )
}