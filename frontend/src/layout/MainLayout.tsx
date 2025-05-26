// src/layout/MainLayout.tsx

import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, message } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        credentials: 'include',
      });

      localStorage.removeItem('token');
      setIsAuthenticated(false);
      message.success('Sesión cerrada');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      message.error('Error al cerrar sesión');
    }
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
        <div className="logo">{collapsed ? 'I' : 'INFIRED'}</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
        >
          <Menu.Item key="/dashboard" icon={<HomeOutlined />}>Inicio</Menu.Item>
          <Menu.Item key="/perfil" icon={<UserOutlined />}>Perfil</Menu.Item>
          <Menu.Item key="/ventas" icon={<FileTextOutlined />}>Ventas</Menu.Item>
          <Menu.Item key="/configuracion" icon={<SettingOutlined />}>Configuración</Menu.Item>
        </Menu>
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

        <Content className="dashboard-content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
