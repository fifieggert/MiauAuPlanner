import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Card, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { animalService, Pet } from '../services/animalService';
import { especiesService } from '../services/especiesService';
import { Especie } from '../types/Especie';

const { Title } = Typography;
const { Option } = Select;

const Pets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [species, setSpecies] = useState<Especie[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPets();
    loadSpecies();
  }, []);

  const loadSpecies = async () => {
    try {
      const data = await especiesService.getAll();
      console.log('Especies:', data);
      setSpecies(data);
    } catch (error) {
      message.error('Erro ao carregar espécies');
    }
  };

  const loadPets = async () => {
    try {
      setLoading(true);
      const data = await animalService.getAll();
      console.log('Data:', data);
      const mappedPets = data.map((pet: any) => ({
        id: pet.id,
        name: pet.nome,
        species: pet.id_especie,
        breed: pet.raca,
        age: pet.idade,
        weight: pet.peso,
        gender: pet.genero,
      }));
      setPets(mappedPets);
    } catch (error) {
      message.error('Erro ao carregar pets');
    } finally {
      setLoading(false);
    }
  };
  

  const handleAddPet = () => {
    setEditingPet(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditPet = (pet: Pet) => {
    console.log(pet, 'pet')
    setEditingPet(pet);
    form.setFieldsValue(pet);
    setIsModalVisible(true);
  };

  const handleDeletePet = async (petId: number) => {
    try {
      await animalService.delete(petId);
      message.success('Pet excluído com sucesso!');
      loadPets();
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
      loadPets();
    } catch (error) {
      message.error('Erro ao salvar pet');
    }
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
      render: (speciesId: number) => {
        const especie = species.find(s => s.id === speciesId);
        return especie ? especie.nome : 'Desconhecido';
      },
    },
    {
      title: 'Raça',
      dataIndex: 'breed',
      key: 'breed',
    },
    {
      title: 'Idade',
      dataIndex: 'age',
      key: 'age',
      render: (age: number) => `${age} anos`,
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
      render: (gender: string) => gender === 'M' ? 'Macho' : 'Fêmea',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={4} style={{ margin: 0 }}>Pets</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPet}>
            Adicionar Pet
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={pets}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          loading={loading}
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
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome do pet' }]}
          >
            <Input />
          </Form.Item>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name="species"
              label="Espécie"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Por favor, selecione a espécie' }]}
            >
              <Select>
                {species.map(especie => (
                  <Option key={especie.id} value={especie.id}>
                    {especie.nome}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="breed"
              label="Raça"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Por favor, insira a raça' }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name="age"
              label="Idade"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Por favor, insira a idade' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="weight"
              label="Peso (kg)"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Por favor, insira o peso' }]}
            >
              <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gênero"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Por favor, selecione o gênero' }]}
            >
              <Select>
                <Option value="M">Macho</Option>
                <Option value="F">Fêmea</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Pets; 