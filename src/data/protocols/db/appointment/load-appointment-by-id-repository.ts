import { AppointmentModel } from '@/domain/models/appointment'

export interface LoadAppointmentByIdRepository {
  loadById (id: string): Promise<AppointmentModel>
}
