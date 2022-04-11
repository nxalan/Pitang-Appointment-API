import { mockAppointmentModel } from '@/domain/test'
import { AddAppointmentRepository } from '@/data/protocols/db/appointment'
import { AppointmentModel, AddAppointmentParams, LoadAppointmentByNameRepository } from '@/data/usecases/appointment/add-appointment'

export const mockAddAppointmentRepository = (): AddAppointmentRepository => {
  class AddAppointmentRepositoryStub implements AddAppointmentRepository {
    async add (appointmentData: AddAppointmentParams): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new AddAppointmentRepositoryStub()
}

export const mockLoadAppointmentByNameRepository = (): LoadAppointmentByNameRepository => {
  class LoadAppointmentByNameRepositoryStub implements LoadAppointmentByNameRepository {
    async loadByName (name: string): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new LoadAppointmentByNameRepositoryStub()
}
