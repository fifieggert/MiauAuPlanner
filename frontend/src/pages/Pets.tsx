import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Card, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  height: number;
  observations: string;
}

const Pets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>(() => {
    const savedPets = localStorage.getItem('pets');
    return savedPets ? JSON.parse(savedPets) : [];
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  // Salvar pets no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  const speciesOptions = [
    { value: 'dog', label: 'Cachorro' },
    { value: 'cat', label: 'Gato' },
    { value: 'bird', label: 'Pássaro' },
    { value: 'other', label: 'Outro' },
  ];

  const handleAddPet = () => {
    setEditingPet(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    form.setFieldsValue(pet);
    setIsModalVisible(true);
  };

  const handleDeletePet = (petId: string) => {
    const updatedPets = pets.filter(pet => pet.id !== petId);
    setPets(updatedPets);
    message.success('Pet excluído com sucesso!');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingPet) {
        // Edição
        setPets(prevPets => {
          const updatedPets = prevPets.map(pet => 
            pet.id === editingPet.id ? { ...pet, ...values } : pet
          );
          message.success('Pet atualizado com sucesso!');
          return updatedPets;
        });
      } else {
        // Cadastro
        const newPet: Pet = {
          id: Date.now().toString(),
          ...values,
        };
        setPets(prevPets => {
          const updatedPets = [...prevPets, newPet];
          message.success('Pet cadastrado com sucesso!');
          return updatedPets;
        });
      }
      setIsModalVisible(false);
      form.resetFields();
    });
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
      render: (species: string) => {
        const option = speciesOptions.find(opt => opt.value === species);
        return option ? option.label : species;
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
      title: 'Altura',
      dataIndex: 'height',
      key: 'height',
      render: (height: number) => `${height} cm`,
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
          <Title level={4} style={{ margin: 0 }}>Meus Pets</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPet}>
            Adicionar Pet
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={pets}
          rowKey="id"
          pagination={{ pageSize: 10 }}
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
                {speciesOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="breed"
              label="Raça"
              style={{ flex: 1 }}
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
              name="height"
              label="Altura (cm)"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Por favor, insira a altura' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Form.Item
            name="observations"
            label="Observações"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Pets; 