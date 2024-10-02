import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from '../src/components/Navbar';
import { Sidebar } from '../src/components/Sidebar';
import { Login } from './components/Login';
import { Fondos } from './pages/Fondos';
import { Cancelaciones } from './pages/Cancelaciones';
import { HistorialTransacciones } from './pages/HistorialTransacciones';
import { Home } from './pages/Home';
import { Registrarse } from './pages/Registrarse';
function App() {
    return (_jsx(Router, { children: _jsxs("div", { className: "app-container", children: [_jsx(Navbar, {}), _jsxs("div", { className: "main-layout", children: [_jsx(Sidebar, {}), _jsx("div", { className: "content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/registro", element: _jsx(Registrarse, {}) }), _jsx(Route, { path: "/fondos", element: _jsx(Fondos, {}) }), _jsx(Route, { path: "/cancelaciones", element: _jsx(Cancelaciones, {}) }), _jsx(Route, { path: "/historial", element: _jsx(HistorialTransacciones, {}) })] }) })] })] }) }));
}
export default App;
