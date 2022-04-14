import { AppointmentModel } from '@/domain/models/appointment'

export interface LoadAppointmentsByDayRepository {
  loadByDay (date: string): Promise<AppointmentModel[]>
}
