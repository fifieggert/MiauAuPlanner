import React, { useState } from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  LogoutOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import './Layout.css';

const { Header, Content, Sider } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return '1';
    if (path.includes('/appointments')) return '2';
    if (path.includes('/pets')) return '3';
    if (path.includes('/users')) return '4';
    return '1';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case '1':
        navigate('/dashboard');
        break;
      case '2':
        navigate('/appointments');
        break;
      case '3':
        navigate('/pets');
        break;
      case '4':
        navigate('/users');
        break;
      case '5':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const menuItems = [
    { key: '1', icon: <HomeOutlined />, label: 'Início' },
    { key: '2', icon: <CalendarOutlined />, label: 'Agendamentos' },
    { key: '3', icon: <TeamOutlined />, label: 'Pets' },
    { key: '4', icon: <UserOutlined />, label: 'Usuários' },
    { key: '5', icon: <LogoutOutlined />, label: 'Sair' },
  ];

  return (
    <Layout className="app-layout">
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="app-sider"
          width={200}
        >
          <div className="logo-container">
            <Typography.Title level={4} className="logo-text">
              {!collapsed && 'MiauAuPlanner'}
            </Typography.Title>
          </div>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            onClick={({ key }) => handleMenuClick(key as string)}
            items={menuItems}
          />
        </Sider>
      )}
      <Layout>
        <Header className="app-header">
          {!isMobile && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="trigger-button"
            />
          )}
          {isMobile && (
            <div className="mobile-header">
              <Typography.Title level={4} className="mobile-logo">
                MiauAuPlanner
              </Typography.Title>
            </div>
          )}
          <div className="user-welcome">
            Bem-vindo, {user?.name}!
          </div>
        </Header>
        <Content className="app-content">
          <Outlet />
        </Content>
        {isMobile && (
          <div className="mobile-nav">
            <Menu
              mode="horizontal"
              selectedKeys={[getSelectedKey()]}
              onClick={({ key }) => handleMenuClick(key as string)}
              items={menuItems}
            />
          </div>
        )}
      </Layout>
    </Layout>
  );
};

export default AppLayout; 