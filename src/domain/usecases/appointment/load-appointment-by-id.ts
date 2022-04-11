import { AppointmentModel } from '@/domain/models/appointment'

export interface LoadAppointmentById {
  loadById (id: string): Promise<AppointmentModel>
}
