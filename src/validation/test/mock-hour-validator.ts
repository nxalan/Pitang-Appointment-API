import { AppointmentModel } from '@/domain/models/appointment'
import { mockListOfEditAppointmentParams } from '@/domain/test'
import { LoadAppointmentsByHour } from '@/domain/usecases/appointment/load-appointments-by-hour'

export const mockLoadAppointmentsByHour = (): LoadAppointmentsByHour => {
  class LoadAppointmentsByHourStub implements LoadAppointmentsByHour {
    async loadByHour (date: string): Promise<AppointmentModel[]> {
      return Promise.resolve(mockListOfEditAppointmentParams(20))
    }
  }
  return new LoadAppointmentsByHourStub()
}
