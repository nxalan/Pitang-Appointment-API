import { AppointmentModel } from '@/domain/models/appointment'
import { mockListOfEditAppointmentParamsWithSameHours } from '@/domain/test'
import { LoadAppointmentsByHour } from '@/domain/usecases/appointment/load-appointments-by-hour'

export const mockLoadAppointmentsByHour = (): LoadAppointmentsByHour => {
  class LoadAppointmentsByHourStub implements LoadAppointmentsByHour {
    async loadByHour (date: string): Promise<AppointmentModel[]> {
      return Promise.resolve(mockListOfEditAppointmentParamsWithSameHours(2))
    }
  }
  return new LoadAppointmentsByHourStub()
}
