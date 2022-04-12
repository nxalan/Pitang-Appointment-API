import { mockAppointmentModel } from '@/domain/test'
import { AddAppointmentRepository, EditAppointmentRepository } from '@/data/protocols/db/appointment'
import { AppointmentModel, AddAppointmentParams, LoadAppointmentByNameRepository, LoadAppointmentByIdRepository } from '@/data/usecases/appointment/add-appointment'
import { EditAppointmentParams } from '@/data/usecases/appointment/edit-appointment'

export const mockAddAppointmentRepository = (): AddAppointmentRepository => {
  class AddAppointmentRepositoryStub implements AddAppointmentRepository {
    async add (appointmentData: AddAppointmentParams): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new AddAppointmentRepositoryStub()
}

export const mockEditAppointmentRepository = (): EditAppointmentRepository => {
  class EditAppointmentRepositoryStub implements EditAppointmentRepository {
    async edit (appointmentData: EditAppointmentParams): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new EditAppointmentRepositoryStub()
}

export const mockLoadAppointmentByNameRepository = (): LoadAppointmentByNameRepository => {
  class LoadAppointmentByNameRepositoryStub implements LoadAppointmentByNameRepository {
    async loadByName (name: string): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new LoadAppointmentByNameRepositoryStub()
}

export const mockLoadAppointmentByIdRepository = (): LoadAppointmentByIdRepository => {
  class LoadAppointmentByIdRepositoryStub implements LoadAppointmentByIdRepository {
    async loadById (id: string): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new LoadAppointmentByIdRepositoryStub()
}
