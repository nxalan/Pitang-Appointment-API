import { mockAppointmentModel, mockAppointmentModels, mockListOfEditAppointmentParamsWithDifferentHours, mockListOfEditAppointmentParamsWithSameHours } from '@/domain/test'
import { AddAppointmentRepository, EditAppointmentRepository } from '@/data/protocols/db/appointment'
import { AppointmentModel, AddAppointmentParams, LoadAppointmentByNameRepository } from '@/data/usecases/appointment/add-appointment'
import { EditAppointmentParams } from '@/data/usecases/appointment/edit-appointment'
import { LoadAppointmentByIdRepository } from '@/data/usecases/appointment/load-appointment-by-id'
import { LoadAppointmentsByDayRepository } from '@/data/usecases/appointment/load-appointments-by-day'
import { LoadAppointmentsByHourRepository } from '@/data/usecases/appointment/load-appointments-by-hour'
import { LoadAppointmentsRepository } from '@/data/protocols/db/appointment/load-appointments-repository'
import { DeleteAppointmentRepository } from '@/data/protocols/db/appointment/delete-appointment-repository'

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
    async loadByDay (date: string): Promise<AppointmentModel[]> {
      return new Promise(resolve => resolve(mockListOfEditAppointmentParamsWithDifferentHours(20)))
    }
  }
  return new LoadAppointmentsByDayRepositoryStub()
}

export const mockLoadAppointmentsByHourRepository = (): LoadAppointmentsByHourRepository => {
  class LoadAppointmentsByHourRepositoryStub implements LoadAppointmentsByHourRepository {
    async loadByHour (date: string): Promise<AppointmentModel[]> {
      return new Promise(resolve => resolve(mockListOfEditAppointmentParamsWithSameHours(2)))
    }
  }
  return new LoadAppointmentsByHourRepositoryStub()
}

export const mockLoadAppointmentsRepository = (): LoadAppointmentsRepository => {
  class LoadAppointmentsRepositoryStub implements LoadAppointmentsRepository {
    async loadAll (): Promise<AppointmentModel[]> {
      return new Promise(resolve => resolve(mockAppointmentModels()))
    }
  }
  return new LoadAppointmentsRepositoryStub()
}

export const mockDeleteAppointmentRepository = (): DeleteAppointmentRepository => {
  class DeleteAppointmentRepositoryStub implements DeleteAppointmentRepository {
    async delete (id: string): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new DeleteAppointmentRepositoryStub()
}
