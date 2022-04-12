import { EditAppointmentParams } from '@/domain/usecases/appointment/edit-appointment'
import { AppointmentModel } from '@/domain/models/appointment'

export interface EditAppointmentRepository {
  edit (appointmentData: EditAppointmentParams): Promise<AppointmentModel>
}
