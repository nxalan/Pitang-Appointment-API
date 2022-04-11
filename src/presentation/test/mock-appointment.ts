import { mockAppointmentModel } from '@/domain/test'
import { AddAppointment, AddAppointmentParams } from '@/domain/usecases/appointment/add-appointment'
import { AppointmentModel } from '@/domain/models/appointment'

export const mockAddAppointment = (): AddAppointment => {
  class AddAccountStub implements AddAppointment {
    async add (appointment: AddAppointmentParams): Promise<AppointmentModel> {
      return new Promise(resolve => resolve(mockAppointmentModel()))
    }
  }
  return new AddAccountStub()
}
