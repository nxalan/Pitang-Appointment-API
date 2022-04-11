import { AppointmentModel } from '@/domain/models/appointment'

export interface LoadAppointmentByNameRepository {
  loadByName (name: string): Promise<AppointmentModel>
}
