import { Link } from 'react-router-dom';
import './../styles/Sidebar.css'; 
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export function Sidebar() {
  // @ts-ignore
  const [hiddenLink, setHiddenLink] = useState(true)
  const isAuthenticated = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isAuthenticated.user) {
      setHiddenLink(false)
    }
  }, [isAuthenticated]);
  return (
    <div className="sidebar">
      <ul>
        {!isAuthenticated.user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registro">Registrarse</Link></li>
          </>
        )}
        <li><Link to="/">Inicio</Link></li>
        {isAuthenticated.user && (
          <>
            <li><Link to="/fondos">Fondos</Link></li>
            <li><Link to="/cancelaciones">Cancelaciones</Link></li>
            <li><Link to="/historial">Historial</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};
