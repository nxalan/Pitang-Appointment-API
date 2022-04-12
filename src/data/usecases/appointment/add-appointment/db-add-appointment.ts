import { AddAppointment, AddAppointmentParams, AppointmentModel, AddAppointmentRepository } from '.'

export class DbAddAppointment implements AddAppointment {
  constructor (
    private readonly addAppointmentRepository: AddAppointmentRepository
  ) { }

  async add (appointmentData: AddAppointmentParams): Promise<AppointmentModel> {
    const newAppointment = await this.addAppointmentRepository.add(appointmentData.appointment_id ? appointmentData
      : Object.assign({}, appointmentData, { status: 'NOT VACCINED', status_comment: '' }))
    return newAppointment
  }
}
