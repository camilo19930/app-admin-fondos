export interface Column {
  id: 'name' | 'category' | 'minimum_amount' | 'actions' | 'idFondo' | 'nombreFondo' | 'fechaVinculación' | 'monto' | 'montoInicial' | 'estado';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
  actions?: any
}
export const columnsfunds: readonly Column[] = [
  { id: 'name', label: 'Nombre', minWidth: 170 },
  { id: 'category', label: 'Categoría', minWidth: 100 },
  {
    id: 'minimum_amount',
    label: 'Monto Minímo',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'actions',
    label: 'Acciones',
    minWidth: 100,
    align: 'center'
  }
];
export const columnsHistory: readonly Column[] = [
  { id: 'nombreFondo', label: 'Nombre', minWidth: 170 },
  {
    id: 'montoInicial',
    label: 'Monto Inicial',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
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
export const columnsHistory2: readonly Column[] = [
  { id: 'nombreFondo', label: 'Nombre', minWidth: 170 },
  {
    id: 'montoInicial',
    label: 'Monto Inicial',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'fechaVinculación', label: 'Fecha Vinculación', minWidth: 200 },
  { id: 'estado', label: 'Estado', minWidth: 80 }
];
export interface DataFunds {
  id: string,
  name: string;
  category: string;
  minimum_amount: number;
}
export interface TableDataProps {
  arrayColums: /*unresolved*/ any
  dataRow: DataFunds[];  // Los datos de la tabla
  isLoading?: boolean;  // Propiedad adicional para mostrar estado de carga
  title?: string;  // Un título opcional
  actions?: [
  ]
  onOpening: () => void,
  onCancel: () => void,
  displayName?: string
}