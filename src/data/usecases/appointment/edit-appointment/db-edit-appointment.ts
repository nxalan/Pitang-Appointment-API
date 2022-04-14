import { EditAppointment, EditAppointmentParams, AppointmentModel, EditAppointmentRepository } from '.'

export class DbEditAppointment implements EditAppointment {
  constructor (
    private readonly EditAppointmentRepository: EditAppointmentRepository
  ) { }

  async edit (appointmentData: EditAppointmentParams): Promise<AppointmentModel> {
    const appointmentDataInISODates = { ...appointmentData }
    if (appointmentData.birthday) {
      appointmentDataInISODates.birthday = new Date(appointmentData.birthday).toISOString()
    }
    if (appointmentData.appointment_date) {
      appointmentDataInISODates.appointment_date = new Date(appointmentData.appointment_date).toISOString()
    }
    const newAppointment = await this.EditAppointmentRepository.edit(appointmentDataInISODates)
    return newAppointment
  }
}
