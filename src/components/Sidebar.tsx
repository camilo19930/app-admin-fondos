import { Link } from 'react-router-dom';
import './../styles/Sidebar.css'; // Archivo para el estilo del sidebar

export function Sidebar () {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/fondos">Fondos</Link></li>
      </ul>
    </div>
  );
};
