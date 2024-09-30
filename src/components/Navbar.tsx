import './../styles/Nabvar.css';
import reactLogo from './../assets/avatar-deactive.svg';
import activateLogo from './../assets/avatar-active.svg';
import btgLogo from './../assets/btg-logo.png';
import btgLogo2 from './../assets/btg-logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
    const [titleSession, setTitleSession] = useState('Cerrar sesión');
    const [logo, setLogo] = useState(reactLogo);
    const [email, setEmail] = useState('');
    const [saldo, setSaldo] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: any) => state.auth);
    const storeUser = useSelector((state: any) => state.user);

    useEffect(() => {
        setEmail(isAuthenticated?.user?.name);
        setLogo(isAuthenticated?.user ? activateLogo : reactLogo);
        UpdateDisabledOutlined();
    }, [isAuthenticated, storeUser]);

    const UpdateDisabledOutlined = () => {
        if (storeUser?.users?.length > 0) {
            const findUser = storeUser?.users?.find((op: any) => op.id === isAuthenticated.user?.id);
            setSaldo(findUser?.saldo);
        } else {
            setSaldo(storeUser?.users?.saldo);
        }
    }

    const handleSession = () => {
        dispatch(login(null));
        setEmail('');
        navigate('/login');
    }
    const formatCurrency = (value: any) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(value);
    }

    return (
        <nav className="navbar">
            <img src={btgLogo} className="btg-logo" alt="BTG logo" />
            <div className="user-icon">
                <img src={logo} className="logo react" alt="React logo" />
                <p>{email}</p>
                {isAuthenticated.user ? (
                    <>
                        <button onClick={handleSession}>{titleSession}</button>
                        <p className="saldo-text">Saldo: {formatCurrency(saldo)}</p>
                    </>
                ) : null}
            </div>
        </nav>
    )
}
