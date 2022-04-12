import { mockAppointmentModel } from '@/domain/test'
import { AddAppointment, AddAppointmentParams } from '@/domain/usecases/appointment/add-appointment'
import { AppointmentModel } from '@/domain/models/appointment'
import { LoadAppointmentById } from '@/domain/usecases/appointment/load-appointment-by-id'

export const mockAddAppointment = (): AddAppointment => {
  class AddAccountStub implements AddAppointment {
    async add (appointment: AddAppointmentParams): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new AddAccountStub()
}

export const mockLoadAppointmentById = (): LoadAppointmentById => {
  class LoadAppointmentByIdStub implements LoadAppointmentById {
    async loadById (id: string): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new LoadAppointmentByIdStub()
}
