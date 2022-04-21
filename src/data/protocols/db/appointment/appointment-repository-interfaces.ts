import { AddAppointmentParams, EditAppointmentParams } from '@/domain/usecases/appointment'
import { AppointmentResponseModel, AppointmentModel, RestrictedDatesModel } from '@/domain/models'

export interface AddAppointmentRepository {
  add (appointmentData: AddAppointmentParams): Promise<AppointmentResponseModel>
}

export interface DeleteAppointmentRepository {
  delete (id: string): Promise<AppointmentModel>
}

export interface EditAppointmentRepository {
  edit (appointmentData: EditAppointmentParams): Promise<AppointmentModel>
}

export interface LoadAppointmentByIdRepository {
  loadById (id: string): Promise<AppointmentModel>
}

export interface LoadAppointmentsByDayRepository {
  loadByDay (date: string): Promise<AppointmentModel[]>
}

export interface LoadAppointmentsByHourRepository {
  loadByHour (date: string): Promise<AppointmentModel[]>
}

export interface LoadAppointmentsRepository {
  loadAll (): Promise<AppointmentModel[]>
}

export interface LoadRestrictedDaysAndHoursRepository {
  load (dateType: string, ammount: number): Promise<string[]>
}

export interface LoadRestrictedDatesDataModel {
  load (): Promise<RestrictedDatesModel>
}
