import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { speciesService, Species } from '../../services/speciesService';

const { Title } = Typography;

const SpeciesPage: React.FC = () => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSpecies, setEditingSpecies] = useState<Species | null>(null);
  const [form] = Form.useForm();

  const fetchSpecies = async () => {
    try {
      setLoading(true);
      const data = await speciesService.getAll();
      setSpecies(data);
    } catch (error) {
      message.error('Erro ao carregar espécies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecies();
  }, []);

  const handleCreate = () => {
    setEditingSpecies(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Species) => {
    setEditingSpecies(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await speciesService.delete(id);
      message.success('Espécie excluída com sucesso');
      fetchSpecies();
    } catch (error) {
      message.error('Erro ao excluir espécie');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingSpecies) {
        await speciesService.update(editingSpecies.ID_especie, values);
        message.success('Espécie atualizada com sucesso');
      } else {
        await speciesService.create(values);
        message.success('Espécie criada com sucesso');
      }
      setModalVisible(false);
      fetchSpecies();
    } catch (error) {
      message.error('Erro ao salvar espécie');
    }
  };

  const columns = [
    {
      title: 'Espécie',
      dataIndex: 'especie',
      key: 'especie',
      width: '70%',
    },
    {
      title: 'Ações',
      key: 'actions',
      width: '30%',
      align: 'center' as const,
      render: (_: any, record: Species) => (
        <Space size="large">
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Editar
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir esta espécie?"
            onConfirm={() => handleDelete(record.ID_especie)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Excluir
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Title level={2}>Espécies</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Nova Espécie
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={species} 
        loading={loading}
        rowKey="ID_especie"
      />

      <Modal
        title={editingSpecies ? 'Editar Espécie' : 'Nova Espécie'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        okText={editingSpecies ? 'Atualizar' : 'Criar'}
        cancelText="Cancelar"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome da espécie' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[{ required: true, message: 'Por favor, insira a descrição da espécie' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SpeciesPage; 