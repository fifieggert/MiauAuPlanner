import React from 'react';
import { Card, Row, Col } from 'antd';

const Dashboard: React.FC = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card 
          title="Agendamentos Hoje" 
          bordered={false}
          style={{ background: '#FFFFFF' }}
        >
          <p>Nenhum agendamento para hoje</p>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card 
          title="Pets Cadastrados" 
          bordered={false}
          style={{ background: '#FFFFFF' }}
        >
          <p>0 pets cadastrados</p>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card 
          title="Próximos Agendamentos" 
          bordered={false}
          style={{ background: '#FFFFFF' }}
        >
          <p>Nenhum agendamento futuro</p>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card 
          title="Total de Clientes" 
          bordered={false}
          style={{ background: '#FFFFFF' }}
        >
          <p>0 clientes</p>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard; 