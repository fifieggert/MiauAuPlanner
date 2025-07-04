import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Card, Typography, Popconfirm } from 'antd';
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
    form.setFieldsValue({ ...user, senha: undefined });
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await userService.delete(id);
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
        const { senha, ...rest } = values;
        const payload = senha ? values : rest;
        await userService.update(editingUser.ID_usuario!, payload);
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
      key: 'acoes',
      render: (_: any, record: Usuario) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          >
            Editar
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir este usuário?"
            onConfirm={() => handleDeleteUser(record.ID_usuario!)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Excluir
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: '8px' }}>
          <Title level={4} style={{ margin: 0 }}>Usuários</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
            Adicionar Usuário
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="ID_usuario"
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} itens`,
            responsive: true,
            size: 'small'
          }}
          scroll={{ x: 'max-content' }}
          size="small"
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
        width="90%"
        style={{ maxWidth: 500 }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome' }]}
          >
            <Input />
          </Form.Item>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Form.Item
              name="telefone"
              label="Telefone"
              style={{ flex: '1 1 200px' }}
              rules={[{ required: true, message: 'Por favor, insira o telefone' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="cpf"
              label="CPF"
              style={{ flex: '1 1 200px' }}
              rules={[{ required: true, message: 'Por favor, insira o CPF' }]}
            >
              <Input />
            </Form.Item>
          </div>

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

          {!editingUser && (
            <Form.Item
              name="senha"
              label="Senha"
              rules={[{ required: true, message: 'Por favor, insira a senha' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Users; 