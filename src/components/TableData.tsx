// @ts-nocheck
import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { columns, columnsfunds, DataFunds, TableDataProps } from '../interfaces/funds.interface'; // Importando desde el archivo columns.ts

export default function TableData({ arrayColums, dataRow, isLoading, title,
  onOpening, displayName, keyId
}: React.PropsWithChildren<TableDataProps>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [funds, setFunds] = useState(dataRow || []);
  const [error, setError] = useState(null);

  // Estado local para almacenar los valores editados
  const [editedValue, setEditedValue] = useState({});

  useEffect(() => {
    setFunds(dataRow);
  }, [dataRow]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Manejar cambios en la columna editable
  const handleEditChange = (e, rowId) => {
    const { value } = e.target;
    setEditedValue((prev) => ({
      ...prev,
      [rowId]: value, // Actualiza el valor por fila
    }));
  };

  return (
    <>
      <h1>{title}</h1>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {arrayColums.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}

                {/* Si estamos en la vista de fondos, mostramos la columna editable */}
                {displayName === 'fondos' && (
                  <TableCell>Saldo Inicial</TableCell>
                )}

                {/* Columna de acciones */}
                {displayName !== 'historial' ? <TableCell>Acciones</TableCell> : null }
                
              </TableRow>
            </TableHead>
            <TableBody>
              {funds
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: DataFunds) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row[keyId]}>
                      {arrayColums.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}

                      {/* Si estamos en la vista de fondos, mostramos el campo editable */}
                      {displayName === 'fondos' && (
                        <TableCell>
                          <TextField
                            value={editedValue[row.id] || ''}
                            onChange={(e) => handleEditChange(e, row.id)}
                            placeholder="Editar valor"
                          />
                        </TableCell>
                      )}

                      {/* Columna de acciones */}
                      {
                        displayName === 'historial' ? null :
                          <TableCell>
                            {displayName !== 'cancelaciones' ? (
                              <Tooltip title="Suscribirse a Fondo" arrow>
                                <AddCircleIcon
                                  onClick={() => onOpening(row, editedValue)} // Llamamos a la función existente sin cambios
                                  style={{ cursor: 'pointer', marginRight: 10 }}
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Cancelar Fondo" arrow>
                                <CancelIcon
                                  onClick={() => onOpening(row)} // Llamamos a la función existente sin cambios
                                  style={{ cursor: 'pointer', marginRight: 10 }}
                                />
                              </Tooltip>
                            )}
                          </TableCell>
                      }

                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={funds.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
