import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import "./Layout.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AppLayout: React.FC<{ children: React.ReactNode }> = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={250}
        style={{
          background: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div className="logo-container">
          <Title level={4} style={{ color: "#4CAF50", margin: 0 }}>
            MiauAuPlanner
          </Title>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            background: "#FFFFFF",
            borderRight: "none",
          }}
        >
          <Menu.Item
            key="1"
            icon={<HomeOutlined style={{ color: "#4CAF50" }} />}
            style={{ margin: "8px 0" }}
            onClick={() => navigate("/dashboard")}
          >
            Início
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<CalendarOutlined style={{ color: "#FFC107" }} />}
            style={{ margin: "8px 0" }}
            onClick={() => navigate("/appointments")}
          >
            Compromissos
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<TeamOutlined style={{ color: "#81C784" }} />}
            style={{ margin: "8px 0" }}
            onClick={() => navigate("/pets")}
          >
            Pets
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<UserOutlined style={{ color: "#2196F3" }} />}
            style={{ margin: "8px 0" }}
            onClick={() => navigate("/users")}
          >
            Usuários
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<LogoutOutlined style={{ color: "#F44336" }} />}
            onClick={handleLogout}
            style={{ margin: "8px 0" }}
          >
            Sair
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 250 }}>
        <Header
          style={{
            padding: 0,
            background: "#FFFFFF",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            position: "sticky",
            top: 0,
            zIndex: 999,
          }}
        >
          <Title level={4} style={{ margin: "16px 24px", color: "#212121" }}>
            Bem-vindo, {user?.name}!
          </Title>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#F1F8E9",
            minHeight: 280,
            borderRadius: "8px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
