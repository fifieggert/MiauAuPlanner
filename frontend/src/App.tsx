import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Pets from './pages/Pets';
import Users from './pages/Users';
import Appointments from './pages/Appointments';
import AppLayout from './components/Layout';
import 'antd/dist/reset.css';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={ptBR}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AppLayout children={undefined} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/users" element={<Users />} />
              <Route path="/appointments" element={<Appointments />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
