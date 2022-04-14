import { AppointmentModel } from '@/domain/models/appointment'

export interface LoadAppointmentsByHourRepository {
  loadByHour (date: string): Promise<AppointmentModel[]>
}
