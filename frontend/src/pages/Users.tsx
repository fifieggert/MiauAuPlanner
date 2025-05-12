import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Card, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Usuario {
  id?: number;
  nome: string;
  telefone: string;
  cpf: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<Usuario[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);

  // Salvar usuários no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditUser = (user: Usuario) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    message.success('Usuário excluído com sucesso!');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingUser) {
        // Edição
        setUsers(prevUsers => {
          const updatedUsers = prevUsers.map(user => 
            user.id === editingUser.id ? { ...user, ...values } : user
          );
          message.success('Usuário atualizado com sucesso!');
          return updatedUsers;
        });
      } else {
        // Cadastro
        const newUser: Usuario = {
          id: Date.now(),
          ...values,
        };
        setUsers(prevUsers => {
          const updatedUsers = [...prevUsers, newUser];
          message.success('Usuário cadastrado com sucesso!');
          return updatedUsers;
        });
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: Usuario) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEditUser(record)}
          >
            Editar
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id!)}
          >
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={4} style={{ margin: 0 }}>Usuários</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
            Adicionar Usuário
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome do usuário' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="telefone"
            label="Telefone"
            rules={[{ required: true, message: 'Por favor, insira o telefone' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="cpf"
            label="CPF"
            rules={[{ required: true, message: 'Por favor, insira o CPF' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: 'Por favor, insira o e-mail' },
              { type: 'email', message: 'E-mail inválido' }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users; 