import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import dayjs from 'dayjs';

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  notes: string;
  status: string;
  pet: {
    name: string;
  };
}

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

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    // Fetch appointments from localStorage
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }

    // Fetch pets from localStorage
    const savedPets = localStorage.getItem('pets');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    }
  }, []);

  // Get today's appointments
  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = dayjs(appointment.date);
    const today = dayjs();
    return appointmentDate.isSame(today, 'day');
  });

  // Get upcoming appointments (excluding today)
  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = dayjs(appointment.date);
    const today = dayjs();
    return appointmentDate.isAfter(today, 'day');
  }).slice(0, 3); // Show only next 3 appointments

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card 
          title="Agendamentos Hoje" 
          bordered={false}
          style={{ background: '#FFFFFF' }}
        >
          {todayAppointments.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {todayAppointments.map(appointment => (
                <li key={appointment.id}>
                  {appointment.time} - {appointment.pet.name} ({appointment.service})
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum agendamento para hoje</p>
          )}
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card 
          title="Pets Cadastrados" 
          bordered={false}
          style={{ background: '#FFFFFF' }}
        >
          <p>{pets.length} pets cadastrados</p>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card 
          title="Próximos Agendamentos" 
          bordered={false}
          style={{ background: '#FFFFFF' }}
        >
          {upcomingAppointments.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {upcomingAppointments.map(appointment => (
                <li key={appointment.id}>
                  {dayjs(appointment.date).format('DD/MM')} - {appointment.time} - {appointment.pet.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum agendamento futuro</p>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard; 