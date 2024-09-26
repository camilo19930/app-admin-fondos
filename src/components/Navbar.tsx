import './../styles/Nabvar.css';
import reactLogo from './../assets/avatar-deactive.png'
export function Navbar() {
    return (
        <nav className="navbar">
            <h1>Mi Aplicación</h1>
            <div className="user-icon">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </div>
        </nav>
    )
}