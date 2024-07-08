import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Clientes from './components/Clientes';
import NovoCliente from './components/NovoCliente';
import ClienteDetalhes from './components/ClientesDetalhes';
import AdicionarExame from './components/AdicionarExame';

const App = () => {
    const isAuthenticated = () => {
        return localStorage.getItem('token') !== null;
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/home"
                    element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                    path="*"
                    element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />}
                />
                <Route
                    path="/clientes"
                    element={isAuthenticated() ? <Clientes /> : <Navigate to="/login" />}
                />
                <Route
                    path="/clientes/novo"
                    element={isAuthenticated() ? <NovoCliente /> : <Navigate to="/login" />}
                />

                <Route
                    path="/clientes/:id/add-exame"
                    element={isAuthenticated() ? <AdicionarExame /> : <Navigate to="/login" />}
                />      
                <Route
                    path="/clientes/:id"
                    element={isAuthenticated() ? <ClienteDetalhes /> : <Navigate to="/login" />}
                />

            </Routes>
        </Router>
    );
};

export default App;
