import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { tipoCompromissoService, TipoCompromisso } from '../../services/tipoCompromissoService';

const { Title } = Typography;

const TipoCompromissoPage: React.FC = () => {
  const [tipos, setTipos] = useState<TipoCompromisso[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTipo, setEditingTipo] = useState<TipoCompromisso | null>(null);
  const [form] = Form.useForm();

  const fetchTipos = async () => {
    try {
      setLoading(true);
      const data = await tipoCompromissoService.getAll();
      setTipos(data);
    } catch (error) {
      message.error('Erro ao carregar tipos de compromisso');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const handleCreate = () => {
    setEditingTipo(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: TipoCompromisso) => {
    setEditingTipo(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await tipoCompromissoService.delete(id);
      message.success('Tipo de compromisso excluído com sucesso');
      fetchTipos();
    } catch (error) {
      message.error('Erro ao excluir tipo de compromisso');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingTipo) {
        await tipoCompromissoService.update(editingTipo.ID_tipo, values);
        message.success('Tipo de compromisso atualizado com sucesso');
      } else {
        await tipoCompromissoService.create(values);
        message.success('Tipo de compromisso criado com sucesso');
      }
      setModalVisible(false);
      fetchTipos();
    } catch (error) {
      message.error('Erro ao salvar tipo de compromisso');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID_tipo',
      key: 'ID_tipo',
      width: '10%',
    },
    {
      title: 'Compromisso',
      dataIndex: 'nome_tipo',
      key: 'nome_tipo',
      width: '70%',
    },
    {
      title: 'Ações',
      key: 'actions',
      width: '20%',
      align: 'center' as const,
      render: (_: any, record: TipoCompromisso) => (
        <Space size="large">
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Editar
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir este tipo de compromisso?"
            description="Esta ação não pode ser desfeita."
            onConfirm={() => handleDelete(record.ID_tipo)}
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
        <Title level={2}>Tipos de compromisso</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Novo Tipo
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={tipos} 
        loading={loading}
        rowKey="ID_tipo"
        pagination={{
          pageSize: 15,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} itens`,
          responsive: true,
          size: 'default'
        }}
      />

      <Modal
        title={editingTipo ? 'Editar Tipo de Compromisso' : 'Novo Tipo de Compromisso'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        okText={editingTipo ? 'Atualizar' : 'Criar'}
        cancelText="Cancelar"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="nome_tipo"
            label="Nome do Tipo"
            rules={[{ required: true, message: 'Por favor, insira o nome do tipo' }]}
          >
            <Input placeholder="Ex: Consulta Veterinária" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TipoCompromissoPage; 