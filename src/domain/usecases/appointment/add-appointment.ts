import { AppointmentModel } from '@/domain/models/appointment'

export type AddAppointmentParams = {
  appointment_id?: string
  name: string
  birthday: Date
  appointment_date: Date
}

export interface AddAppointment {
  add (appointment: AddAppointmentParams): Promise<AppointmentModel>
}
