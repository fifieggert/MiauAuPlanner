import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../components/Login.css';

const { Title } = Typography;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; senha: string }) => {
    try {
      setLoading(true);
      await login(values.email, values.senha);
      message.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <img src="src/assets/pet-house.png" alt="Logo" className="logo" />
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30, color: '#4CAF50' }}>
          Miau&Au Planner
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu e-mail!' },
              { type: 'email', message: 'E-mail inválido!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="E-mail"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="senha"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Senha"
              size="large"
              style={{ width: '100%', marginTop: '-40px' }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 