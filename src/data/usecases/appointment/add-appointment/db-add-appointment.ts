import { AddAppointment, AddAppointmentParams, AppointmentModel, AddAppointmentRepository } from '.'

export class DbAddAppointment implements AddAppointment {
  constructor (
    private readonly addAppointmentRepository: AddAppointmentRepository
  ) { }

  async add (appointmentData: AddAppointmentParams): Promise<AppointmentModel> {
    const newAppointment = await this.addAppointmentRepository.add(
      Object.assign(
        {},
        appointmentData,
        {
          status: 'NOT VACCINED',
          status_comment: '',
          birthday: new Date(appointmentData.birthday).toISOString(),
          appointment_date: new Date(appointmentData.appointment_date).toISOString()
        }
      ))
    return newAppointment
  }
}
