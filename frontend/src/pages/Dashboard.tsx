import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Tag, Spin, Typography } from 'antd';
import { CalendarOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { compromissoService, Compromisso } from '../services/compromissoService';
import { animalService, Pet } from '../services/animalService';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Compromisso[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsData, petsData] = await Promise.all([
          compromissoService.getAll(),
          animalService.getAll()
        ]);
        setAppointments(appointmentsData);
        setPets(petsData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get today's appointments
  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = dayjs(appointment.data_compromissos);
    const today = dayjs();
    return appointmentDate.isSame(today, 'day');
  });

  // Get upcoming appointments (excluding today)
  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = dayjs(appointment.data_compromissos);
    const today = dayjs();
    return appointmentDate.isAfter(today, 'day');
  }).slice(0, 3); // Show only next 3 appointments

  const getPetName = (petId: number) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : 'Pet não encontrado';
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card 
      title={<><CalendarOutlined /> Visão Geral</>}
      bordered={false}
      className="dashboard-card"
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={4} style={{ margin: 0 }}>
              <TeamOutlined style={{ marginRight: 8 }} />
              Total de animais cadastrados: <span style={{ color: 'var(--primary-color)' }}>{pets.length}</span>
            </Title>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <Card 
            title="Agendamentos de Hoje"
            className="dashboard-subcard"
          >
            {todayAppointments.length > 0 ? (
              <ul className="dashboard-list">
                {todayAppointments.map(appointment => (
                  <li key={appointment.ID_compromisso}>
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    <span style={{ fontWeight: 500 }}>
                      {dayjs(appointment.data_compromissos).format('HH:mm')}
                    </span>
                    <span style={{ margin: '0 8px' }}>-</span>
                    <span style={{ color: 'var(--text-primary)' }}>
                      {getPetName(appointment.ID_animal)}
                    </span>
                    {appointment.observacoes && (
                      <Tag color="blue" style={{ marginLeft: 8 }}>
                        {appointment.observacoes}
                      </Tag>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum agendamento para hoje</p>
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card 
            title="Próximos Agendamentos"
            className="dashboard-subcard"
          >
            {upcomingAppointments.length > 0 ? (
              <ul className="dashboard-list">
                {upcomingAppointments.map(appointment => (
                  <li key={appointment.ID_compromisso}>
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    <span style={{ fontWeight: 500 }}>
                      {dayjs(appointment.data_compromissos).format('DD/MM')} às {dayjs(appointment.data_compromissos).format('HH:mm')}
                    </span>
                    <span style={{ margin: '0 8px' }}>-</span>
                    <span style={{ color: 'var(--text-primary)' }}>
                      {getPetName(appointment.ID_animal)}
                    </span>
                    {appointment.observacoes && (
                      <Tag color="blue" style={{ marginLeft: 8 }}>
                        {appointment.observacoes}
                      </Tag>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum agendamento futuro</p>
            )}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard; 