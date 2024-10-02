import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Sidebar } from './Sidebar';
import { MemoryRouter } from 'react-router-dom';
const mockStore = configureStore([]);
let store;
describe('Sidebar component', () => {
    beforeEach(() => {
        store = mockStore({
            auth: { user: null }
        });
    });
    test('muestra los enlaces de login y registro cuando el usuario no está autenticado', () => {
        render(_jsx(Provider, { store: store, children: _jsxs(MemoryRouter, { children: [" ", _jsx(Sidebar, {})] }) }));
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Registrarse')).toBeInTheDocument();
    });
});
