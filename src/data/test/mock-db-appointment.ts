import { mockAppointmentModel, mockListOfEditAppointmentParams } from '@/domain/test'
import { AddAppointmentRepository, EditAppointmentRepository } from '@/data/protocols/db/appointment'
import { AppointmentModel, AddAppointmentParams, LoadAppointmentByNameRepository } from '@/data/usecases/appointment/add-appointment'
import { LoadAppointmentByIdRepository } from '@/data/usecases/appointment/load-appointment-by-id'
import { EditAppointmentParams } from '@/data/usecases/appointment/edit-appointment'
import { LoadAppointmentsByDayRepository } from '@/data/usecases/appointment/load-appointments-by-day'

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

export const mockLoadAppointmentsByDayRepository = (): LoadAppointmentsByDayRepository => {
  class LoadAppointmentsByDayRepositoryStub implements LoadAppointmentsByDayRepository {
    async loadByDay (date: Date): Promise<AppointmentModel[]> {
      return new Promise(resolve => resolve(mockListOfEditAppointmentParams(20)))
    }
  }
  return new LoadAppointmentsByDayRepositoryStub()
}
