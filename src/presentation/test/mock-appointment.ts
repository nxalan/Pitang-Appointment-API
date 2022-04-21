import { mockAppointmentModel, mockAppointmentModels, mockRestrictedDatesModel, mockAppointmentResponseModel } from '@/domain/test'
import { AddAppointment, AddAppointmentParams, EditAppointment, EditAppointmentParams, LoadAppointmentById, LoadAppointments, DeleteAppointment, LoadRestrictedDates } from '@/domain/usecases/appointment'
import { AppointmentModel, RestrictedDatesModel, AppointmentResponseModel } from '@/domain/models'

export const mockAddAppointment = (): AddAppointment => {
  class AddAppointmentStub implements AddAppointment {
    async add (appointment: AddAppointmentParams): Promise<AppointmentResponseModel> {
      return new Promise(resolve => resolve(mockAppointmentResponseModel()))
    }
  }
  return new AddAppointmentStub()
}

export const mockEditAppointment = (): EditAppointment => {
  class EditAppointmentStub implements EditAppointment {
    async edit (appointment: EditAppointmentParams): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new EditAppointmentStub()
}

export const mockLoadAppointmentById = (): LoadAppointmentById => {
  class LoadAppointmentByIdStub implements LoadAppointmentById {
    async loadById (id: string): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new LoadAppointmentByIdStub()
}

export const mockLoadAppointments = (): LoadAppointments => {
  class LoadAppointmentsStub implements LoadAppointments {
    async load (): Promise<AppointmentModel[]> {
      return new Promise(resolve => resolve(mockAppointmentModels()))
    }
  }
  return new LoadAppointmentsStub()
}

export const mockDeleteAppointment = (): DeleteAppointment => {
  class DeleteAppointmentStub implements DeleteAppointment {
    async delete (id: string): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new DeleteAppointmentStub()
}

export const mockLoadRestrictedDates = (): LoadRestrictedDates => {
  class LoadRestrictedDatesStub implements LoadRestrictedDates {
    async load (): Promise<RestrictedDatesModel> {
      return new Promise(resolve => resolve(mockRestrictedDatesModel()))
    }
  }
  return new LoadRestrictedDatesStub()
}
