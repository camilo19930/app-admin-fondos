import { useEffect, useState } from "react";
import axios from 'axios';
import { columnsfunds } from "../interfaces/funds.interface.ts";
import { useDispatch } from "react-redux";
import { getFund } from "../redux/FundSlide.ts";
import { useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { getUser } from "../redux/userSlide.ts";
import { TableData } from "../components/TableData.tsx";

export function Fondos() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [funds, setFunds] = useState([]);
  // @ts-ignore
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
      .get(`${apiUrl}/funds`)
      .then((response:any) => {
        dispatch(getFund(response.data));
        return setFunds(response.data);
      })
      .catch((error) => {
        setError(error.toString());
        console.log(error)
      });
  }
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    console.log(event)
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false); 
  };
  const handleOpening = (row: any, editedValue:any) => {
    const valorInicial = editedValue[row.id]
    if (valorInicial) {
        const data = {
      id: row?.id,
      name: row?.name,
      category: row?.category,
      minimum_amount: row?.minimum_amount,
      // initial_amount: isAuthenticated.user?.saldo ? isAuthenticated.user?.saldo : 0
      initial_amount: typeof valorInicial !== 'number' ? Number(valorInicial) : valorInicial
    }
    const url = `${apiUrl}/transaction/fondo_actual/${isAuthenticated.user?.id}`

    axios.put(url, data)
      .then((response: any) => {
        getFondos();
        setAlertMessage(response?.data?.mensaje);
        setAlertSeverity('success'); 
        setOpenAlert(true);
        getUsers()
      })
      .catch((error) => {
        const messageError = error.response.data?.detail ? error.response.data?.detail : error.response.data?.mensaje
        setAlertMessage(messageError);
        setAlertSeverity('error');
        setOpenAlert(true);
      });
    } else {
      setAlertMessage('Debe poner un valor inicial');
        setAlertSeverity('error');
        setOpenAlert(true);
    }
  
  };

  const getUsers = () => {
    axios
      .get(`${apiUrl}/users/${isAuthenticated.user.id}`)
      .then((response) => {
        dispatch(getUser(response.data));
        // return setFunds(response.data);
      })
      .catch((error) => {
        setError(error.toString());
      });
  }

  return (
    <>
      <TableData arrayColums={columnsfunds} dataRow={funds} isLoading={true} title="Lista de Fondos"
        onOpening={handleOpening} displayName="fondos" keyId="id"
      ></TableData>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  )
}