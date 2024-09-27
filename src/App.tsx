import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from '../src/components/Navbar'
import { Sidebar } from '../src/components/Sidebar'
import { Login } from './components/Login';
import { Fondos } from './pages/Fondos';
import { Cancelaciones } from './pages/Cancelaciones';
import { HistorialTransacciones } from './pages/HistorialTransacciones';
import { Home } from './pages/Home';



function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/fondos" element={<Fondos />} />
              <Route path="/cancelaciones" element={<Cancelaciones />} />
              <Route path="/historial" element={<HistorialTransacciones />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
