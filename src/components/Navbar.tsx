import './../styles/Nabvar.css';
import reactLogo from './../assets/avatar-deactive.png'
import activateLogo from './../assets/avatar-active.png'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
    const [titleSession, setTitleSession] = useState('Cerrar sesión')
    const [logo, setLogo] = useState(reactLogo)
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: any) => state.auth);

    useEffect(() => {
        setEmail(isAuthenticated?.user?.name)
        setLogo(isAuthenticated?.user ? activateLogo : reactLogo)
    }, [isAuthenticated])

    const handleSession = () => {
        dispatch(login(null));
        setEmail('')
        navigate('/login'); 
    }
    return (
        <nav className="navbar">
            <h1>Administración de Fondos</h1>
            <div className="user-icon">
                <img src={logo} className="logo react" alt="React logo" />
                <p>{email}</p>
                {isAuthenticated.user ? (
                    <button onClick={handleSession}>{titleSession}</button>
                ) : null}
            </div>
        </nav>
    )
}