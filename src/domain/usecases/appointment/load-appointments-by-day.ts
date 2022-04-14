import { AppointmentModel } from '@/domain/models/appointment'

export interface LoadAppointmentsByDay {
  loadByDay (date: Date): Promise<AppointmentModel[]>
}
