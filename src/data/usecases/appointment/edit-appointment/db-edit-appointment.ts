import { InvalidParamError } from '@/presentation/errors'
import { EditAppointment, EditAppointmentParams, AppointmentModel, EditAppointmentRepository, LoadAppointmentsByDayRepository, LoadAppointmentsByHourRepository } from '.'

export class DbEditAppointment implements EditAppointment {
  constructor (
    private readonly EditAppointmentRepository: EditAppointmentRepository,
    private readonly loadAppointmentsByDay: LoadAppointmentsByDayRepository,
    private readonly loadAppointmentsByHour: LoadAppointmentsByHourRepository
  ) { }

  async edit (appointmentData: EditAppointmentParams): Promise<Error | AppointmentModel> {
    if (appointmentData.appointment_date) {
      const daysList = await this.loadAppointmentsByDay.loadByDay(appointmentData.appointment_date)
      if (daysList.length >= 20) {
        return new InvalidParamError('appointment_date day is already full')
      }
      const hoursList = await this.loadAppointmentsByHour.loadByHour(appointmentData.appointment_date)
      if (hoursList.length >= 2) {
        return new InvalidParamError('appointment_date hour is already full')
      }
    }
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
