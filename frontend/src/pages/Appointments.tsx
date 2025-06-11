import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, TimePicker, Select, message, Row, Col, Card, Typography, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { compromissoService, Compromisso } from '../services/compromissoService';
import { animalService, Pet } from '../services/animalService';
import { useAuth } from '../contexts/AuthContext';

const { Option } = Select;
const { Title } = Typography;

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Compromisso[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await compromissoService.getAll();
      setAppointments(data);
    } catch (error) {
      message.error('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  const fetchPets = async () => {
    try {
      const data = await animalService.getAll();
      setPets(data);
    } catch (error) {
      message.error('Erro ao carregar pets');
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchPets();
  }, []);

  const handleCreate = async (values: any) => {
    try {
      const compromissoData = {
        data_compromissos: values.date.format('YYYY-MM-DD'),
        ID_animal: Number(values.petId),
        observacoes: values.notes || ''
      };

      if (!compromissoData.data_compromissos || !compromissoData.ID_animal) {
        message.error('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      if (editingId) {
        await compromissoService.update(editingId, compromissoData);
        message.success('Agendamento atualizado com sucesso');
      } else {
        await compromissoService.create(compromissoData);
        message.success('Agendamento criado com sucesso');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchAppointments();
    } catch (error: any) {
      console.error('Erro ao salvar agendamento:', error);
      message.error(error.response?.data?.message || 'Erro ao salvar agendamento');
    }
  };

  const handleEdit = (record: Compromisso) => {
    setEditingId(record.ID_compromisso!);
    form.setFieldsValue({
      date: dayjs(record.data_compromissos),
      petId: record.ID_animal,
      notes: record.observacoes
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await compromissoService.delete(id);
      message.success('Agendamento excluído com sucesso');
      fetchAppointments();
    } catch (error) {
      message.error('Erro ao excluir agendamento');
    }
  };

  const getPetName = (petId: number) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : 'Pet não encontrado';
  };

  const columns = [
    {
      title: 'Data',
      dataIndex: 'data_compromissos',
      key: 'data_compromissos',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Pet',
      dataIndex: 'ID_animal',
      key: 'pet',
      render: (petId: number) => getPetName(petId),
    },
    {
      title: 'Observações',
      dataIndex: 'observacoes',
      key: 'observacoes',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: Compromisso) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Editar
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.ID_compromisso!)}
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
          <Title level={4} style={{ margin: 0 }}>Agendamentos</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingId(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Novo Agendamento
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={appointments}
          rowKey="ID_compromisso"
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
        title={editingId ? 'Editar Agendamento' : 'Novo Agendamento'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        onOk={() => form.submit()}
        width="100%"
        style={{ maxWidth: 500 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreate}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="date"
                label="Data"
                rules={[{ required: true, message: 'Por favor, selecione a data' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="petId"
                label="Pet"
                rules={[{ required: true, message: 'Por favor, selecione o pet' }]}
              >
                <Select>
                  {pets.map(pet => (
                    <Option key={pet.id} value={pet.id}>
                      {pet.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="notes"
            label="Observações"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Appointments; 