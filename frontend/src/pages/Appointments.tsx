import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, TimePicker, Select, message, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

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

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  notes: string;
  status: string;
  pet: {
    id: string;
    name: string;
  };
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }

    const savedPets = localStorage.getItem('pets');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    }
  }, []);

  const saveAppointments = (newAppointments: Appointment[]) => {
    setAppointments(newAppointments);
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
  };

  const handleCreate = (values: any) => {
    try {
      const selectedPet = pets.find(pet => pet.id === values.petId);
      if (!selectedPet) {
        message.error('Pet não encontrado');
        return;
      }

      const newAppointment: Appointment = {
        id: editingId || Math.random().toString(36).substr(2, 9),
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        service: values.service,
        notes: values.notes || '',
        status: values.status,
        pet: {
          id: selectedPet.id,
          name: selectedPet.name
        }
      };

      let newAppointments;
      if (editingId) {
        newAppointments = appointments.map(app => 
          app.id === editingId ? newAppointment : app
        );
      } else {
        newAppointments = [...appointments, newAppointment];
      }

      saveAppointments(newAppointments);
      message.success(editingId ? 'Agendamento atualizado com sucesso' : 'Agendamento criado com sucesso');
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
    } catch (error) {
      message.error('Erro ao salvar agendamento');
    }
  };

  const handleEdit = (record: Appointment) => {
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
      time: dayjs(record.time, 'HH:mm'),
      petId: record.pet.id
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    try {
      const newAppointments = appointments.filter(app => app.id !== id);
      saveAppointments(newAppointments);
      message.success('Agendamento excluído com sucesso');
    } catch (error) {
      message.error('Erro ao excluir agendamento');
    }
  };

  const columns = [
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Hora',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Serviço',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Pet',
      dataIndex: ['pet', 'name'],
      key: 'pet',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: Appointment) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
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
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} itens`,
        }}
      />

      <Modal
        title={editingId ? 'Editar Agendamento' : 'Novo Agendamento'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreate}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Data"
                rules={[{ required: true, message: 'Por favor, selecione a data' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Hora"
                rules={[{ required: true, message: 'Por favor, selecione a hora' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item
                name="service"
                label="Serviço"
                rules={[{ required: true, message: 'Por favor, selecione o serviço' }]}
              >
                <Select>
                  <Option value="banho">Banho</Option>
                  <Option value="tosa">Tosa</Option>
                  <Option value="banho_tosa">Banho e Tosa</Option>
                  <Option value="consulta">Consulta</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                initialValue="Pendente"
              >
                <Select>
                  <Option value="Pendente">Pendente</Option>
                  <Option value="Confirmado">Confirmado</Option>
                  <Option value="Concluído">Concluído</Option>
                  <Option value="Cancelado">Cancelado</Option>
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