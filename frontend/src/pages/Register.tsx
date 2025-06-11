import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const { Title } = Typography;

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    nome: string;
    telefone: string;
    cpf: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }) => {
    if (values.senha !== values.confirmarSenha) {
      message.error('As senhas não coincidem!');
      return;
    }

    try {
      setLoading(true);
      await register({
        nome: values.nome,
        telefone: values.telefone,
        cpf: values.cpf,
        email: values.email,
        senha: values.senha
      });
      message.success('Cadastro realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Falha no cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30, color: '#4CAF50' }}>
          Criar Conta
        </Title>
        <Form
          name="register"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="nome"
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nome"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="telefone"
            rules={[{ required: true, message: 'Por favor, insira seu telefone!' }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Telefone"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="cpf"
            rules={[{ required: true, message: 'Por favor, insira seu CPF!' }]}
          >
            <Input
              prefix={<IdcardOutlined />}
              placeholder="CPF"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu e-mail!' },
              { type: 'email', message: 'E-mail inválido!' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="E-mail"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="senha"
            rules={[
              { required: true, message: 'Por favor, insira sua senha!' },
              { min: 6, message: 'A senha deve ter pelo menos 6 caracteres!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Senha"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmarSenha"
            dependencies={['senha']}
            rules={[
              { required: true, message: 'Por favor, confirme sua senha!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('senha') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('As senhas não coincidem!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirmar Senha"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Cadastrar
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => navigate('/')}>
              Já tem uma conta? Faça login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register; 