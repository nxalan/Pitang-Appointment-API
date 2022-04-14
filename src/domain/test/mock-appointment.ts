import { AppointmentModel } from '@/domain/models/appointment'
import { AddAppointmentParams } from '@/domain/usecases/appointment/add-appointment'
import { EditAppointmentParams } from '@/domain/usecases/appointment/edit-appointment'
import { randomUUID } from 'crypto'

export const mockAppointmentModel = (): AppointmentModel => ({
  id: 'any_id',
  name: 'any_name',
  birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
  appointment_date: new Date(new Date().setDate(new Date().getDate() + 1)),
  status: 'NOT VACCINED',
  status_comment: ''
})

export const mockAddAppointmentParams = (): AddAppointmentParams => ({
  name: 'any_name',
  birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
  appointment_date: new Date(new Date().setDate(new Date().getDate() + 1))
})

export const mockEditAppointmentParams = (): EditAppointmentParams => ({
  id: 'any_id',
  name: 'any_name',
  birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
  appointment_date: new Date(new Date().setDate(new Date().getDate() + 1)),
  status: 'any_status',
  status_comment: 'any_status_comment'
})

export const mockListOfAddAppointmentParams = (numberOfAppointments: number): AddAppointmentParams[] => {
  let listOfAppointments = new Array(numberOfAppointments).fill(mockAddAppointmentParams())
  listOfAppointments = listOfAppointments.map((cb) => ({ ...cb, name: randomUUID().substring(0, 5) }))
  return (listOfAppointments)
}

export const mockListOfEditAppointmentParams = (numberOfAppointments: number): AppointmentModel[] => {
  let listOfAppointments = new Array(numberOfAppointments).fill(mockEditAppointmentParams())
  listOfAppointments = listOfAppointments.map((cb) => ({ ...cb, name: randomUUID().substring(0, 5) }))
  return (listOfAppointments)
}
