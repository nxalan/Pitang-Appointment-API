import { AppointmentModel } from '@/domain/models/appointment'
import { AddAppointmentParams } from '@/domain/usecases/appointment/add-appointment'

export const mockAppointmentModel = (): AppointmentModel => ({
  id: 'any_id',
  name: 'any_name',
  birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
  appointmentdDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  status: 'NOT VACCINED',
  appointmentComments: ''
})

export const mockAddAppointmentParams = (): AddAppointmentParams => ({
  name: 'any_name',
  birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
  appointmentdDate: new Date(new Date().setDate(new Date().getDate() + 1))
})
