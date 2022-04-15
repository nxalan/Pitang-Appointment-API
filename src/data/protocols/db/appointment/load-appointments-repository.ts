import { AppointmentModel } from '@/domain/models/appointment'

export interface LoadAppointmentsRepository {
  loadAll (): Promise<AppointmentModel[]>
}
