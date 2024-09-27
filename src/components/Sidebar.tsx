import { Link } from 'react-router-dom';
import './../styles/Sidebar.css'; // Archivo para el estilo del sidebar
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export function Sidebar () {
  const [ hiddenLink, setHiddenLink] = useState(true)
  const dispatch = useDispatch();
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
          <li><Link to="/login">Login</Link></li>
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
