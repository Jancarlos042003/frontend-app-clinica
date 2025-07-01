export interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  type: 'presencial' | 'virtual';
  status: 'programada' | 'confirmada' | 'cancelada';
}
