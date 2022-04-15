import { AppointmentModel } from '@/domain/models/appointment'

export interface DeleteAppointment {
  delete (id: string): Promise<AppointmentModel>
}
