import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import './../styles/Sidebar.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
export function Sidebar() {
    // @ts-ignore
    const [hiddenLink, setHiddenLink] = useState(true);
    const isAuthenticated = useSelector((state) => state.auth);
    useEffect(() => {
        if (isAuthenticated.user) {
            setHiddenLink(false);
        }
    }, [isAuthenticated]);
    return (_jsx("div", { className: "sidebar", children: _jsxs("ul", { children: [!isAuthenticated.user && (_jsxs(_Fragment, { children: [_jsx("li", { children: _jsx(Link, { to: "/login", children: "Login" }) }), _jsx("li", { children: _jsx(Link, { to: "/registro", children: "Registrarse" }) })] })), _jsx("li", { children: _jsx(Link, { to: "/", children: "Inicio" }) }), isAuthenticated.user && (_jsxs(_Fragment, { children: [_jsx("li", { children: _jsx(Link, { to: "/fondos", children: "Fondos" }) }), _jsx("li", { children: _jsx(Link, { to: "/cancelaciones", children: "Cancelaciones" }) }), _jsx("li", { children: _jsx(Link, { to: "/historial", children: "Historial" }) })] }))] }) }));
}
;
