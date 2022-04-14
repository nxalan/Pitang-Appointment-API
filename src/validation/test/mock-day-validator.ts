import { AppointmentModel } from '@/domain/models/appointment'
import { mockListOfEditAppointmentParams } from '@/domain/test'
import { LoadAppointmentsByDay } from '@/domain/usecases/appointment/load-appointments-by-day'

export const mockLoadAppointmentsByDay = (): LoadAppointmentsByDay => {
  class LoadAppointmentsByDayStub implements LoadAppointmentsByDay {
    async loadByDay (date: string): Promise<AppointmentModel[]> {
      return Promise.resolve(mockListOfEditAppointmentParams(20))
    }
  }
  return new LoadAppointmentsByDayStub()
}
