// src/App.tsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import esES from 'antd/locale/es_ES';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VentasPage from './pages/VentasPage';
import FunnelsPage from './pages/FunnelsPage';

import { AuthProvider } from './context/AuthContext';
import axios from '@/api/axiosConfig'; // 👈 importa tu instancia de axios

import './App.css';

// 🛠️ Configuración global de mensajes
message.config({
  getContainer: () => document.body,
  top: 100,
  duration: 3,
  maxCount: 3,
});

const App: React.FC = () => {
  useEffect(() => {
    axios.get('/sanctum/csrf-cookie')
      .then(() => console.log('[CSRF] Cookie inicial cargada'))
      .catch((err) => console.error('[CSRF] Error al obtener cookie:', err));
  }, []);

  return (
    <ConfigProvider locale={esES}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Rutas privadas */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/ventas"
              element={
                <PrivateRoute>
                  <VentasPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/funnels"
              element={
                <PrivateRoute>
                  <FunnelsPage />
                </PrivateRoute>
              }
            />


            {/* Redirección para rutas desconocidas */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ConfigProvider>
  );
};

export default App;
