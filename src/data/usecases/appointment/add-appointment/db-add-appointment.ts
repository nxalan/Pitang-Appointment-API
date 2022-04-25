import { InvalidParamError } from '@/presentation/errors'
import { AddAppointment, AddAppointmentParams, AppointmentResponseModel, AddAppointmentRepository, LoadAppointmentsByDayRepository, LoadAppointmentsByHourRepository } from '.'

export class DbAddAppointment implements AddAppointment {
  constructor (
    private readonly addAppointmentRepository: AddAppointmentRepository,
    private readonly loadAppointmentsByDay: LoadAppointmentsByDayRepository,
    private readonly loadAppointmentsByHour: LoadAppointmentsByHourRepository
  ) { }

  async add (appointmentData: AddAppointmentParams): Promise<Error | AppointmentResponseModel> {
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
