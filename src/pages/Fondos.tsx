import { useEffect, useState } from "react";
import axios from 'axios';
import TableData from "../components/TableData.tsx";
import { columnsfunds } from "../interfaces/funds.interface.ts";

export function Fondos() {
    const [funds, setFunds] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios
        .get('http://127.0.0.1:8000/funds')
        .then((response) => {
          return setFunds(response.data);
        })
        .catch((error) => {
          setError(error.toString());
        });
      }, []);
      
      if (error) {
        return <div>Error: {error}</div>;
      }
    return (
        <TableData arrayColums={columnsfunds} dataRow={funds} isLoading={true} title="Lista de Fondos"></TableData>
    )
}