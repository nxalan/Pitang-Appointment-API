import { AppointmentResponseModel, AppointmentModel, RestrictedDatesModel } from '@/domain/models'

export type AddAppointmentParams = {
  name: string
  birthday: string
  appointment_date: string
}

export type EditAppointmentParams = {
  id: string
  name?: string
  birthday?: string
  appointment_date?: string
  status?: string
  status_comment?: string
}

export interface AddAppointment {
  add (appointment: AddAppointmentParams): Promise<AppointmentResponseModel>
}

export interface DeleteAppointment {
  delete (id: string): Promise<AppointmentModel>
}

export interface EditAppointment {
  edit (appointment: EditAppointmentParams): Promise<AppointmentModel>
}

export interface LoadAppointmentById {
  loadById (id: string): Promise<AppointmentModel>
}

export interface LoadAppointmentsByDay {
  loadByDay (date: string): Promise<AppointmentModel[]>
}

export interface LoadAppointmentsByHour {
  loadByHour (date: string): Promise<AppointmentModel[]>
}

export interface LoadAppointments {
  load (): Promise<AppointmentModel[]>
}

export interface LoadRestrictedDates {
  load (): Promise<RestrictedDatesModel>
}
