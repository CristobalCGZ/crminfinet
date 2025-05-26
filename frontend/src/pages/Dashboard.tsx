// src/pages/Dashboard.tsx
import { useAuth } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';

import axios from '@/api/axiosConfig';


import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, message, Card, Row, Col } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

import './Dashboard.css';
import VentaModal from '../components/VentaModal';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [ventaVisible, setVentaVisible] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate(); // ✅ correcta declaración


  const handleLogout = async () => {
  try {
    await fetch('/api/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    });

    localStorage.removeItem('token');
    setIsAuthenticated(false); // 👈 Actualizás el estado
    message.success('Sesión cerrada');
    navigate('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    message.error('Error al cerrar sesión');
  }
};


  const handleVentaSubmit = async (data: any) => {
    try {
      const response = await fetch('http://localhost:8000/api/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        message.success('Venta registrada exitosamente');
        setVentaVisible(false);
      } else {
        message.error(result.message || 'Error al registrar la venta');
      }
    } catch (error) {
      console.error(error);
      message.error('Error de conexión con el servidor');
    }
  };

  const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [
      {
        label: 'Ventas Mensuales',
        data: [5, 10, 7, 15, 8],
        backgroundColor: '#FF6B00',
      },
    ],
  };

  return (
    <Layout className="dashboard-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="custom-sider"
        width={220}
      >
        <div className="logo">{collapsed ? 'I' : 'Infinet CRM'}</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            { key: '/dashboard', icon: <DashboardOutlined />, label: 'Inicio' },
            { key: '/perfil', icon: <UserOutlined />, label: 'Perfil' },
            { key: '/ventas', icon: <FileTextOutlined />, label: 'Ventas' },
          ]}
        />

      </Sider>

      <Layout>
        <Header className="custom-header">
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
              className="trigger"
            />
            <Title level={4} style={{ margin: 0, color: '#fff' }}>Bienvenido, Cristóbal</Title>
          </div>

          <Button icon={<LogoutOutlined />} onClick={handleLogout} danger>
            Cerrar sesión
          </Button>
        </Header>

        <Content className="dashboard-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2}>Panel Principal</Title>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => setVentaVisible(true)}
              style={{ background: '#FF6B00', borderColor: '#FF6B00' }}
            >
              Agregar venta
            </Button>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Ventas Fijo" bordered={false}>
                <p>Total últimos 3 meses: 45</p>
                <p>Este mes: 12</p>
                <p>Rechazadas: 3</p>
                <Bar data={chartData} height={200} />
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Ventas Móvil" bordered={false}>
                <p>Total últimos 3 meses: 38</p>
                <p>Este mes: 9</p>
                <p>Rechazadas: 2</p>
                <Bar data={chartData} height={200} />
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Histórico de Ventas" bordered={false}>
                <Bar data={chartData} height={300} />
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Supervisor Asignado" bordered={false}>
                <p>Nombre: Carla Fuentes</p>
                <p>Email: carla@infinet.cl</p>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>

      <VentaModal
        visible={ventaVisible}
        onClose={() => setVentaVisible(false)}
        onSubmit={handleVentaSubmit}
      />
    </Layout>
  );
};

export default Dashboard;
