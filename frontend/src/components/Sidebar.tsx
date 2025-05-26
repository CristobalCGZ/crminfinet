import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo">INFIRED</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>Inicio</Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>Clientes</Menu.Item>
        <Menu.Item key="3" icon={<FileTextOutlined />}>Ventas</Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>Configuración</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
