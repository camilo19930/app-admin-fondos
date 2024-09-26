import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from '../src/components/Navbar'
import { Sidebar } from '../src/components/Sidebar'
import { Login } from './components/Login';
import { Fondos } from './pages/Fondos';

const Inicio = () => <div>Contenido de Inicio</div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/login" element={<Login />} />
              <Route path="/fondos" element={<Fondos />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
