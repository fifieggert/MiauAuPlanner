import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Card, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { animalService, Pet } from '../services/animalService';
import { speciesService, Species } from '../services/speciesService';
import { userService, Usuario } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;
const { Option } = Select;

const Pets: React.FC = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);
  const [users, setUsers] = useState<Usuario[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await animalService.getAll();
      // Filtrar pets pelo usuário logado
      const userPets = data.filter((pet: any) => pet.id_usuario === user?.id);
      setPets(userPets);
    } catch (error) {
      message.error('Erro ao carregar pets');
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecies = async () => {
    try {
      const data = await speciesService.getAll();
      setSpecies(data);
    } catch (error) {
      message.error('Erro ao carregar espécies');
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await userService.findAll();
      setUsers(data);
    } catch (error) {
      message.error('Erro ao carregar usuários');
    }
  };

  useEffect(() => {
    fetchPets();
    fetchSpecies();
    fetchUsers();
  }, []);

  const handleAddPet = () => {
    setEditingPet(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    form.setFieldsValue({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      weight: pet.weight,
      gender: pet.gender,
      observations: pet.observations,
      id_usuario: pet.id_usuario
    });
    setIsModalVisible(true);
  };

  const handleDeletePet = async (id: number) => {
    try {
      await animalService.delete(id);
      message.success('Pet excluído com sucesso!');
      fetchPets();
    } catch (error) {
      message.error('Erro ao excluir pet');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingPet) {
        await animalService.update(editingPet.id, values);
        message.success('Pet atualizado com sucesso!');
      } else {
        await animalService.create(values);
        message.success('Pet cadastrado com sucesso!');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchPets();
    } catch (error) {
      message.error('Erro ao salvar pet');
    }
  };

  const getSpeciesName = (speciesId: number) => {
    const speciesObj = species.find(s => s.ID_especie === speciesId);
    return speciesObj ? speciesObj.especie : 'Espécie não encontrada';
  };

  const getUserName = (userId: number) => {
    const userObj = users.find(u => u.ID_usuario === userId);
    return userObj ? userObj.nome : 'Usuário não encontrado';
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Espécie',
      dataIndex: 'species',
      key: 'species',
      render: (speciesId: number) => getSpeciesName(speciesId),
    },
    {
      title: 'Peso',
      dataIndex: 'weight',
      key: 'weight',
      render: (weight: number) => `${weight} kg`,
    },
    {
      title: 'Gênero',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Tutor',
      dataIndex: 'id_usuario',
      key: 'tutor',
      render: (userId: number) => getUserName(userId),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: Pet) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEditPet(record)}
          >
            Editar
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeletePet(record.id)}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: '8px' }}>
          <Title level={4} style={{ margin: 0 }}>Pets</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPet}>
            Adicionar Pet
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={pets}
          rowKey="id"
          loading={loading}
          pagination={{ 
            pageSize: 15,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} itens`,
            responsive: true,
            size: 'default'
          }}
          scroll={{ x: 'max-content' }}
          size="middle"
          style={{ marginTop: 16 }}
        />
      </Card>

      <Modal
        title={editingPet ? 'Editar Pet' : 'Adicionar Pet'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width="100%"
        style={{ maxWidth: 600 }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Form.Item
              name="name"
              label="Nome"
              style={{ flex: '1 1 200px' }}
              rules={[{ required: true, message: 'Por favor, insira o nome do pet' }]}
            >
              <Input placeholder="Nome" />
            </Form.Item>

            <Form.Item
              name="id_usuario"
              label="Tutor"
              style={{ flex: '1 1 200px' }}
              rules={[{ required: true, message: 'Por favor, selecione o tutor' }]}
            >
              <Select
                placeholder="Selecione"
                optionLabelProp="label"
              >
                {users.map(user => (
                  <Option 
                    key={user.ID_usuario} 
                    value={user.ID_usuario}
                    label={user.nome}
                  >
                    {user.nome}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Form.Item
              name="species"
              label="Espécie"
              style={{ flex: '1 1 200px' }}
              rules={[{ required: true, message: 'Por favor, selecione a espécie' }]}
            >
              <Select
                placeholder="Selecione"
                optionLabelProp="label"
              >
                {species.map(specie => (
                  <Option 
                    key={specie.ID_especie} 
                    value={specie.ID_especie}
                    label={specie.especie}
                  >
                    {specie.especie}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="breed"
              label="Raça"
              style={{ flex: '1 1 200px' }}
              rules={[{ required: true, message: 'Por favor, insira a raça' }]}
            >
              <Input placeholder="Raça" />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Form.Item
              name="age" 
              label="Idade"
              style={{ flex: '1 1 150px' }}
              rules={[{ required: true, message: 'Por favor, insira a idade' }]}
            >
              <InputNumber defaultValue={0} min={0} style={{ width: '100%' }}  />
            </Form.Item>
            <Form.Item
              name="weight"
              label="Peso (kg)"
              style={{ flex: '1 1 150px' }}
              rules={[{ required: true, message: 'Por favor, insira o peso' }]}
            >
              <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gênero"
              style={{ flex: '1 1 150px' }}
              rules={[{ required: true, message: 'Por favor, selecione o gênero' }]}
            >
              <Select placeholder="Selecione">
                <Option value="M">Macho</Option>
                <Option value="F">Fêmea</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="observations"
            label="Observações"
          >
            <Input.TextArea rows={4} placeholder="Observações" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Pets; 