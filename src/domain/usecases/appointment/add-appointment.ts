import { AppointmentResponseModel } from '@/domain/models/appointment'

export type AddAppointmentParams = {
  name: string
  birthday: string
  appointment_date: string
}

export interface AddAppointment {
  add (appointment: AddAppointmentParams): Promise<AppointmentResponseModel>
}
