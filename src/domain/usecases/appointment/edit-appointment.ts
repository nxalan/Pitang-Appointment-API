import { AppointmentModel } from '@/domain/models/appointment'

export type EditAppointmentParams = {
  appointment_id: string
  name?: string
  birthday?: Date
  appointment_date?: Date
  status?: string
  status_comment?: string
}

export interface EditAppointment {
  edit (appointment: EditAppointmentParams): Promise<AppointmentModel>
}
