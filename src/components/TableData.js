import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
export function TableData({ arrayColums, dataRow, isLoading, title, onOpening, displayName, keyId }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [funds, setFunds] = useState(dataRow || []);
    // Estado local para almacenar los valores editados
    const [editedValue, setEditedValue] = useState({});
    useEffect(() => {
        setFunds(dataRow);
    }, [dataRow]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
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
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: title }), _jsxs(Paper, { sx: { width: '100%', overflow: 'hidden' }, children: [_jsx(TableContainer, { sx: { maxHeight: 440 }, children: _jsxs(Table, { stickyHeader: true, "aria-label": "sticky table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [arrayColums.map((column) => (_jsx(TableCell, { align: column.align, style: { minWidth: column.minWidth }, children: column.label }, column.id))), displayName === 'fondos' && (_jsx(TableCell, { children: "Saldo Inicial" })), displayName !== 'historial' ? _jsx(TableCell, { children: "Acciones" }) : null] }) }), _jsx(TableBody, { children: funds
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, rowIndex) => (
                                    // Clave única para cada fila basada en 'row[keyId]' o el índice como respaldo
                                    _jsxs(TableRow, { hover: true, role: "checkbox", tabIndex: -1, children: [arrayColums.map((column, colIndex) => {
                                                const value = row[column.id];
                                                return (
                                                // Clave única para cada celda
                                                _jsx(TableCell, { align: column.align, children: column.format && typeof value === 'number' ? column.format(value) : value }, `${column.id}-${row[keyId] || rowIndex}-${colIndex}`));
                                            }), displayName === 'fondos' && (_jsx(TableCell, { children: _jsx(TextField, { value: editedValue[row.id] || '', onChange: (e) => handleEditChange(e, row.id), placeholder: "Editar valor" }) }, `edit-${row[keyId] || rowIndex}`)), displayName !== 'historial' && (_jsx(TableCell, { children: displayName !== 'cancelaciones' ? (_jsx(Tooltip, { title: "Suscribirse a Fondo", arrow: true, children: _jsx(AddCircleIcon, { onClick: () => onOpening(row, editedValue), style: { cursor: 'pointer', marginRight: 10 } }) })) : (_jsx(Tooltip, { title: "Cancelar Fondo", arrow: true, children: _jsx(CancelIcon, { onClick: () => onOpening(row), style: { cursor: 'pointer', marginRight: 10 } }) })) }, `action-${row[keyId] || rowIndex}`))] }, row[keyId] || rowIndex))) })] }) }), _jsx(TablePagination, { rowsPerPageOptions: [10, 25, 100], component: "div", count: funds.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage })] })] }));
}
