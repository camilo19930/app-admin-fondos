import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './../styles/Nabvar.css';
import reactLogo from './../assets/avatar-deactive.svg';
import activateLogo from './../assets/avatar-active.svg';
import btgLogo from './../assets/btg-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
export function Navbar() {
    const [titleSession] = useState('Cerrar sesión');
    const [logo, setLogo] = useState(reactLogo);
    const [email, setEmail] = useState('');
    const [saldo, setSaldo] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth);
    const storeUser = useSelector((state) => state.user);
    useEffect(() => {
        setEmail(isAuthenticated?.user?.name);
        setLogo(isAuthenticated?.user ? activateLogo : reactLogo);
        UpdateDisabledOutlined();
    }, [isAuthenticated, storeUser]);
    const UpdateDisabledOutlined = () => {
        if (storeUser?.users?.length > 0) {
            const findUser = storeUser?.users?.find((op) => op.id === isAuthenticated.user?.id);
            setSaldo(findUser?.saldo);
        }
        else {
            setSaldo(storeUser?.users?.saldo);
        }
    };
    const handleSession = () => {
        dispatch(login(null));
        setEmail('');
        navigate('/login');
    };
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(value);
    };
    return (_jsxs("nav", { className: "navbar", children: [_jsx("img", { src: btgLogo, className: "btg-logo", alt: "BTG logo" }), _jsxs("div", { className: "user-icon", children: [_jsx("img", { src: logo, className: "logo react", alt: "React logo" }), _jsx("p", { children: email }), isAuthenticated.user ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleSession, children: titleSession }), _jsxs("p", { className: "saldo-text", children: ["Saldo: ", formatCurrency(saldo)] })] })) : null] })] }));
}
