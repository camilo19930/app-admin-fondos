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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { columns, columnsfunds, DataFunds, TableDataProps } from '../interfaces/funds.interface'; // Importando desde el archivo columns.ts

export default function TableData({ arrayColums, dataRow, isLoading, title,
  onOpening, onCancel
 }: React.PropsWithChildren<TableDataProps>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [funds, setFunds] = useState(dataRow || []);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    setFunds(dataRow);  // Actualizamos los fondos cuando cambia dataRow
  }, [dataRow]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  // if (isLoading) {
  //   return <p>Cargando datos...</p>;  // Mostrar mensaje de carga si isLoading es true
  // }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
              </TableRow>
            </TableHead>
            <TableBody>
              {funds
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: DataFunds) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {arrayColums.map((column) => {
                        if (column.id === 'actions') {
                          return (
                            
                            <TableCell key={column.id} align={column.align}>
                              <AddCircleIcon
                                onClick={() => onOpening(row)}
                                style={{ cursor: 'pointer', marginRight: 10 }}
                              />
                              <DeleteIcon
                                onClick={() => onCancel(row)}
                                style={{ cursor: 'pointer' }}
                              />
                            </TableCell>
                          );
                        }

                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
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
