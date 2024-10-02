export interface Column {
    id: 'historicoId' | 'name' | 'category' | 'minimum_amount' | 'actions' | 'idFondo' | 'nombreFondo' | 'fechaVinculación' | 'monto' | 'montoInicial' | 'estado';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
    actions?: any;
}
export declare const columnsfunds: readonly Column[];
export declare const columnsHistory: readonly Column[];
export declare const columnsHistory2: readonly Column[];
export interface DataFunds {
    id: string;
    name: string;
    category: string;
    minimum_amount: number;
}
export interface TableDataProps {
    arrayColums: any;
    dataRow: DataFunds[];
    isLoading?: boolean;
    title?: string;
    actions?: [
    ];
    onOpening?: (row?: any, editValiue?: any) => any;
    onCancel?: () => void;
    displayName?: string;
    keyId?: string;
}
