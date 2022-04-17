import { mockAppointmentModel, mockAppointmentModels, mockAppointmentResponseModel, mockListOfEditAppointmentParamsWithDifferentHours, mockListOfEditAppointmentParamsWithSameHours, mockRestrictedDatesModel, mockRestrictedDayModel, mockRestrictedHourModel } from '@/domain/test'
import { AddAppointmentRepository, EditAppointmentRepository, DeleteAppointmentRepository, LoadAppointmentsByHourRepository, LoadAppointmentsByDayRepository, LoadAppointmentByIdRepository, LoadAppointmentsRepository, LoadRestrictedDatesDataModel, LoadRestrictedDaysAndHoursRepository } from '@/data/protocols/db/appointment'
import { AppointmentResponseModel, AppointmentModel, AddAppointmentParams, RestrictedDatesModel } from '@/data/usecases/appointment/add-appointment'
import { EditAppointmentParams } from '@/data/usecases/appointment/edit-appointment'

export const mockAddAppointmentRepository = (): AddAppointmentRepository => {
  class AddAppointmentRepositoryStub implements AddAppointmentRepository {
    async add (appointmentData: AddAppointmentParams): Promise<AppointmentResponseModel> {
      return new Promise(resolve => resolve(mockAppointmentResponseModel()))
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

export const mockLoadRestrictedDayRepository = (): LoadRestrictedDaysAndHoursRepository => {
  class LoadRestrictedDayRepositoryStub implements LoadRestrictedDaysAndHoursRepository {
    async load (dateType: string, ammount: number): Promise<string[]> {
      return new Promise(resolve => resolve(mockRestrictedDayModel()))
    }
  }
  return new LoadRestrictedDayRepositoryStub()
}

export const mockLoadRestrictedHourRepository = (): LoadRestrictedDaysAndHoursRepository => {
  class LoadRestrictedHourRepositoryStub implements LoadRestrictedDaysAndHoursRepository {
    async load (dateType: string, ammount: number): Promise<string[]> {
      return new Promise(resolve => resolve(mockRestrictedHourModel()))
    }
  }
  return new LoadRestrictedHourRepositoryStub()
}
