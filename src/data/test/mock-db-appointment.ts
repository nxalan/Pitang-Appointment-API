import { mockAppointmentModel, mockAppointmentModels, mockListOfEditAppointmentParamsWithDifferentHours, mockListOfEditAppointmentParamsWithSameHours, mockRestrictedDatesModel } from '@/domain/test'
import { AddAppointmentRepository, EditAppointmentRepository, DeleteAppointmentRepository, LoadAppointmentsByHourRepository, LoadAppointmentsByDayRepository, LoadAppointmentByIdRepository, LoadAppointmentsRepository, LoadRestrictedDatesRepository } from '@/data/protocols/db/appointment'
import { AppointmentModel, AddAppointmentParams } from '@/data/usecases/appointment/add-appointment'
import { EditAppointmentParams } from '@/data/usecases/appointment/edit-appointment'
import { RestrictedDatesModel } from '@/domain/models/appointment'

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

export const mockLoadRestrictedDatesRepository = (): LoadRestrictedDatesRepository => {
  class LoadRestrictedDatesRepositoryStub implements LoadRestrictedDatesRepository {
    async load (): Promise<RestrictedDatesModel> {
      return new Promise(resolve => resolve(mockRestrictedDatesModel()))
    }
  }
  return new LoadRestrictedDatesRepositoryStub()
}
