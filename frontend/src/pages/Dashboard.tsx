import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Tag, Spin, Typography } from 'antd';
import { CalendarOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { compromissoService, Compromisso } from '../services/compromissoService';
import { animalService, Pet } from '../services/animalService';
import { tipoCompromissoService, TipoCompromisso } from '../services/tipoCompromissoService';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Compromisso[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [tipos, setTipos] = useState<TipoCompromisso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsData, petsData, tiposData] = await Promise.all([
          compromissoService.getAll(),
          animalService.getAll(),
          tipoCompromissoService.getAll()
        ]);

        // Filtrar pets pelo usuário logado
        const userPets = petsData.filter((pet: Pet) => pet.id_usuario === user?.id);
        setPets(userPets);

        // Filtrar compromissos que pertencem aos pets do usuário
        const userPetIds = userPets.map(pet => pet.id);
        const userAppointments = appointmentsData.filter(
          (appointment: Compromisso) => userPetIds.includes(appointment.ID_animal)
        );
        setAppointments(userAppointments);
        
        setTipos(tiposData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  // Get today's appointments
  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = dayjs(appointment.data_compromissos);
    const today = dayjs();
    return appointmentDate.isSame(today, 'day');
  }).sort((a, b) => a.horario_compromissos.localeCompare(b.horario_compromissos));

  // Get upcoming appointments (excluding today)
  const upcomingAppointments = appointments
    .filter(appointment => {
      const appointmentDate = dayjs(appointment.data_compromissos);
      const today = dayjs().startOf('day');
      return appointmentDate.isAfter(today);
    })
    .sort((a, b) => {
      const dateA = dayjs(`${a.data_compromissos} ${a.horario_compromissos}`);
      const dateB = dayjs(`${b.data_compromissos} ${b.horario_compromissos}`);
      return dateA.diff(dateB);
    })
    .slice(0, 3); // Show only next 3 appointments

  console.log('Today:', todayAppointments);
  console.log('Upcoming:', upcomingAppointments);

  const getPetName = (petId: number) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : 'Pet não encontrado';
  };

  const getTipoName = (tipoId: number) => {
    const tipo = tipos.find(t => t.ID_tipo === tipoId);
    return tipo ? tipo.nome_tipo : 'Tipo não encontrado';
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
                  <li key={appointment.ID_compromissos}>
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    <span style={{ fontWeight: 500 }}>
                      {appointment.horario_compromissos}
                    </span>
                    <span style={{ margin: '0 8px' }}>-</span>
                    <span style={{ color: 'var(--text-primary)' }}>
                      {getPetName(appointment.ID_animal)}
                    </span>
                    <Tag color="blue" style={{ marginLeft: 8 }}>
                      {getTipoName(appointment.ID_tipo)}
                    </Tag>
                    {appointment.observacoes && (
                      <Tag color="green" style={{ marginLeft: 8 }}>
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
                  <li key={appointment.ID_compromissos}>
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    <span style={{ fontWeight: 500 }}>
                      {dayjs(appointment.data_compromissos).format('DD/MM')} às {appointment.horario_compromissos}
                    </span>
                    <span style={{ margin: '0 8px' }}>-</span>
                    <span style={{ color: 'var(--text-primary)' }}>
                      {getPetName(appointment.ID_animal)}
                    </span>
                    <Tag color="blue" style={{ marginLeft: 8 }}>
                      {getTipoName(appointment.ID_tipo)}
                    </Tag>
                    {appointment.observacoes && (
                      <Tag color="green" style={{ marginLeft: 8 }}>
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