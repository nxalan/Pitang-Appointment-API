import { AddAppointmentParams } from '@/domain/usecases/appointment/add-appointment'
import { AppointmentModel } from '@/domain/models/appointment'

export interface AddAppointmentRepository {
  add (appointmentData: AddAppointmentParams): Promise<AppointmentModel>
}
