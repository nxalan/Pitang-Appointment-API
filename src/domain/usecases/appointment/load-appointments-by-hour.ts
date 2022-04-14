import { AppointmentModel } from '@/domain/models/appointment'

export interface LoadAppointmentsByHour {
  loadByHour (date: string): Promise<AppointmentModel[]>
}
