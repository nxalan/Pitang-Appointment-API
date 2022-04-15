import { AppointmentModel } from '@/domain/models/appointment'

export interface DeleteAppointmentRepository {
  delete (id: string): Promise<AppointmentModel>
}
