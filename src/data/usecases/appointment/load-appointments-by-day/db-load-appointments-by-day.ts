import { AppointmentModel, LoadAppointmentsByDay, LoadAppointmentsByDayRepository } from '.'

export class DbLoadAppointmentsByDay implements LoadAppointmentsByDay {
  constructor (private readonly loadAppointmentByHourRepository: LoadAppointmentsByDayRepository) {}

  async loadByDay (date: string): Promise<AppointmentModel[]> {
    const appointment = await this.loadAppointmentByHourRepository.loadByDay(date)
    return appointment
  }
}
