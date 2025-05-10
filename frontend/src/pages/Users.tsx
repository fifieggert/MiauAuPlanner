import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Card, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { userService, Usuario } from '../services/userService';

const { Title } = Typography;

const Users: React.FC = () => {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.findAll();
      setUsers(data);
    } catch (error) {
      message.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleDeleteUser = async (userId: number) => {
    try {
      await userService.delete(userId);
      message.success('Usuário excluído com sucesso!');
      fetchUsers();
    } catch (error) {
      message.error('Erro ao excluir usuário');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await userService.update(editingUser.ID_usuario!, values);
        message.success('Usuário atualizado com sucesso!');
      } else {
        await userService.create(values);
        message.success('Usuário cadastrado com sucesso!');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error('Erro ao salvar usuário');
    }
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
            onClick={() => handleDeleteUser(record.ID_usuario!)}
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
          rowKey="ID_usuario"
          pagination={{ pageSize: 10 }}
          loading={loading}
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