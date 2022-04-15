import { AddAppointmentParams } from '@/domain/usecases/appointment/add-appointment'
import { AppointmentResponseModel } from '@/domain/models/appointment'

export interface AddAppointmentRepository {
  add (appointmentData: AddAppointmentParams): Promise<AppointmentResponseModel>
}
