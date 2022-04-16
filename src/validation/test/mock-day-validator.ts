import { AppointmentModel } from '@/domain/models'
import { mockListOfEditAppointmentParamsWithDifferentHours } from '@/domain/test'
import { LoadAppointmentsByDay } from '@/domain/usecases/appointment'

export const mockLoadAppointmentsByDay = (): LoadAppointmentsByDay => {
  class LoadAppointmentsByDayStub implements LoadAppointmentsByDay {
    async loadByDay (date: string): Promise<AppointmentModel[]> {
      return Promise.resolve(mockListOfEditAppointmentParamsWithDifferentHours(20))
    }
  }
  return new LoadAppointmentsByDayStub()
}
