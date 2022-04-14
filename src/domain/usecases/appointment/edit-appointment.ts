import { AppointmentModel } from '@/domain/models/appointment'

export type EditAppointmentParams = {
  id: string
  name?: string
  birthday?: string
  appointment_date?: string
  status?: string
  status_comment?: string
}

export interface EditAppointment {
  edit (appointment: EditAppointmentParams): Promise<AppointmentModel>
}
