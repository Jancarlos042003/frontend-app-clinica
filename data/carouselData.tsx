import { JSX } from 'react';

import Chat from '../components/svg/Chatbot';
import MedicalAppointments from '../components/svg/MedicalAppointments';
import MedicalCalendar from '../components/svg/MedicalCalendar';
import Sos from '../components/svg/Sos';
import Treatments from '../components/svg/Treatments';

export type CarouselItem = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
};

export const carouselData: CarouselItem[] = [
  {
    id: '1',
    title: 'Tratamientos Médicos',
    description: 'Crea y gestiona tus tratamientos médicos de forma sencilla',
    icon: <Treatments />,
  },
  {
    id: '2',
    title: 'Citas Médicas',
    description: 'Programa y recibe recordatorios de tus próximas citas',
    icon: <MedicalAppointments />,
  },
  {
    id: '3',
    title: 'Chatbot Asistente',
    description: 'Resuelve tus dudas médicas con nuestro asistente virtual',
    icon: <Chat />,
  },
  {
    id: '4',
    title: 'Botón S.O.S',
    description: 'Solicita ayuda inmediata en caso de emergencia',
    icon: <Sos />,
  },
  {
    id: '5',
    title: 'Calendario',
    description: 'Visualiza tus recordatorios y citas en un solo lugar',
    icon: <MedicalCalendar />,
  },
];
