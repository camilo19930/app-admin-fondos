export const columnsfunds = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'category', label: 'Categoría', minWidth: 100 },
    {
        id: 'minimum_amount',
        label: 'Monto Minímo',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: 'Acciones',
        minWidth: 100,
        align: 'center'
    }
];
export const columnsHistory = [
    { id: 'historicoId', label: 'Id Fondo', minWidth: 170 },
    { id: 'nombreFondo', label: 'Fondo', minWidth: 170 },
    {
        id: 'montoInicial',
        label: 'Monto Inicial',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'fechaVinculación', label: 'Fecha Vinculación', minWidth: 200 },
    { id: 'estado', label: 'Estado', minWidth: 80 },
    {
        id: 'actions',
        label: 'Acciones',
        minWidth: 100,
        align: 'center'
    }
];
export const columnsHistory2 = [
    { id: 'historicoId', label: 'Id Fondo', minWidth: 170 },
    { id: 'nombreFondo', label: 'Fondo', minWidth: 170 },
    {
        id: 'montoInicial',
        label: 'Saldo',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'fechaVinculación', label: 'Fecha', minWidth: 200,
    },
    { id: 'estado', label: 'Acción', minWidth: 80 }
];
