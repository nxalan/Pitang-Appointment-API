import { AppointmentModel } from '@/domain/models/appointment'

export interface LoadAppointments {
  load (): Promise<AppointmentModel[]>
}
