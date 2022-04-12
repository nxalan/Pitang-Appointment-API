import { EditAppointment, EditAppointmentParams, AppointmentModel, EditAppointmentRepository } from '.'

export class DbEditAppointment implements EditAppointment {
  constructor (
    private readonly EditAppointmentRepository: EditAppointmentRepository
  ) { }

  async edit (appointmentData: EditAppointmentParams): Promise<AppointmentModel> {
    const newAppointment = await this.EditAppointmentRepository.edit(appointmentData.appointment_id ? appointmentData
      : Object.assign({}, appointmentData, { status: 'NOT VACCINED', status_comment: '' }))
    return newAppointment
  }
}
