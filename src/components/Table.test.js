import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { TableData } from './TableData';
import '@testing-library/jest-dom';
import { columnsfunds, columnsHistory, columnsHistory2 } from '../interfaces/funds.interface';
let fundsMock = [
    {
        id: '66f48e60ff4f5823b82c2c77',
        name: 'FPV_BTG_PACTUAL_DINAMICA',
        category: 'FPV',
        minimum_amount: 75000.0
    },
    {
        id: '55f48e60ff4f5823b82c2c77',
        name: 'FPV_BTG_PACTUAL_DINAMICA',
        category: 'FPV',
        minimum_amount: 75000.0
    }
];
let historialMock = [
    {
        "idFondo": "66f4a6193c38b9fcd7a3c445",
        "nombreFondo": "DEUDAPRIVADA",
        "fechaVinculación": "2024-09-27T14:20:14.869000",
        "monto": 50000.0,
        "estado": false,
        "montoInicial": 600000.0,
        "historicoId": "66f70564fc834575bc534141"
    }
];
const columnsfundsMock = columnsfunds;
const columnsHistory2Mock = columnsHistory2;
const columnsHistoryMock = columnsHistory;
const coulumnsCancelacionesMock = columnsHistory;
let handleOpeningMock = jest.fn();
let handleCancelMock = jest.fn();
describe('Table component', () => {
    beforeEach(() => {
        fundsMock = [
            {
                "id": "66f48e60ff4f5823b82c2c77",
                "name": "FPV_BTG_PACTUAL_DINAMICA",
                "category": "FPV",
                "minimum_amount": 75000.0
            }
        ];
    });
    test('renderizado table', () => {
        render(_jsx(TableData, { arrayColums: columnsfundsMock, dataRow: fundsMock, isLoading: true, title: "Lista de Fondos", onOpening: handleOpeningMock, displayName: "fondos", keyId: "id" }));
        const title = screen.getByRole('heading', { name: 'Lista de Fondos' });
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
    });
    test('renderizado table historial', () => {
        render(_jsx(TableData, { arrayColums: columnsHistory2Mock, dataRow: fundsMock, isLoading: true, title: "Historial Transacciones", onOpening: handleOpeningMock, displayName: "historicoId", keyId: "historicoId" }));
        const title = screen.getByRole('heading', { name: 'Historial Transacciones' });
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
    });
    test('renderizado table historial', () => {
        render(_jsx(TableData, { arrayColums: columnsHistory2Mock, dataRow: fundsMock, isLoading: true, title: "Historial Transacciones", onOpening: handleOpeningMock, displayName: "historicoId", keyId: "historicoId" }));
        const title = screen.getByRole('heading', { name: 'Historial Transacciones' });
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
    });
    test('renderizado table cancelaciones', () => {
        render(_jsx(TableData, { arrayColums: coulumnsCancelacionesMock, dataRow: fundsMock, isLoading: true, title: "Lista de Fondos Actuales / Cancelaciones", onOpening: handleOpeningMock, displayName: "cancelaciones", keyId: "historicoId" }));
        const title = screen.getByRole('heading', { name: 'Lista de Fondos Actuales / Cancelaciones' });
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
    });
    test('renderizado table cancelaciones null', () => {
        render(_jsx(TableData, { arrayColums: coulumnsCancelacionesMock, dataRow: [], isLoading: false, title: "Lista de Fondos Actuales / Cancelaciones", onOpening: handleOpeningMock, displayName: "", keyId: "" }));
        const title = screen.getByRole('heading', { name: 'Lista de Fondos Actuales / Cancelaciones' });
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
    });
    test('should call onOpening when AddCircleIcon is clicked', () => {
        render(_jsx(TableData, { arrayColums: columnsfundsMock, dataRow: fundsMock, isLoading: false, title: "Lista de Fondos", onOpening: handleOpeningMock, displayName: "fondos", keyId: "id" }));
        const addCircleIcon = screen.getByLabelText('Suscribirse a Fondo');
        fireEvent.click(addCircleIcon);
        expect(handleOpeningMock).toHaveBeenCalledWith(fundsMock[0], {});
        expect(handleOpeningMock).toHaveBeenCalledTimes(1);
    });
    test('should call onOpening when CancelIcon is clicked', () => {
        render(_jsx(TableData, { arrayColums: columnsHistoryMock, dataRow: historialMock, isLoading: false, title: "Lista de Fondos Actuales / Cancelaciones", onOpening: handleCancelMock, displayName: "cancelaciones", keyId: "historicoId" }));
        const cancelIcon = screen.getByLabelText('Cancelar Fondo');
        fireEvent.click(cancelIcon);
        expect(handleCancelMock).toHaveBeenCalledWith(historialMock[0]);
        expect(handleCancelMock).toHaveBeenCalledTimes(1);
    });
    test('should call onOpening cancel', () => {
        render(_jsx(TableData, { arrayColums: columnsHistoryMock, dataRow: historialMock, isLoading: false, title: "Lista de Fondos Actuales / Cancelaciones", onOpening: handleCancelMock, displayName: "cancelaciones", keyId: "historicoId" }));
        const cancelIcon = screen.getByLabelText('Cancelar Fondo');
        fireEvent.click(cancelIcon);
        expect(handleCancelMock).toHaveBeenCalledWith(historialMock[0]);
        expect(handleCancelMock).toHaveBeenCalledTimes(2);
    });
    test('should update edited value when input changes', () => {
        const handleOpeningMock = jest.fn();
        render(_jsx(TableData, { arrayColums: columnsfunds, dataRow: fundsMock, isLoading: false, title: "Lista de Fondos", onOpening: handleOpeningMock, displayName: "fondos", keyId: "id" }));
        const input = screen.getByPlaceholderText('Editar valor');
        fireEvent.change(input, { target: { value: '5000' } });
        expect(input).toBeDefined();
    });
});
