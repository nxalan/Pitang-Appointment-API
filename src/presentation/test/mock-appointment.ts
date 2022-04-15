import { mockAppointmentModel, mockAppointmentModels } from '@/domain/test'
import { AddAppointment, AddAppointmentParams } from '@/domain/usecases/appointment/add-appointment'
import { EditAppointment, EditAppointmentParams } from '@/domain/usecases/appointment/edit-appointment'
import { AppointmentModel } from '@/domain/models/appointment'
import { LoadAppointmentById } from '@/domain/usecases/appointment/load-appointment-by-id'
import { LoadAppointments } from '@/domain/usecases/appointment/load-appointments'

export const mockAddAppointment = (): AddAppointment => {
  class AddAppointmentStub implements AddAppointment {
    async add (appointment: AddAppointmentParams): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
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
