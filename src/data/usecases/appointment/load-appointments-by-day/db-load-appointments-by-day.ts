import { AppointmentModel, LoadAppointmentsByDay, LoadAppointmentsByDayRepository } from '.'

export class DbLoadAppointmentsByDay implements LoadAppointmentsByDay {
  constructor (private readonly loadAppointmentByIdRepository: LoadAppointmentsByDayRepository) {}

  async loadByDay (date: string): Promise<AppointmentModel[]> {
    const appointment = await this.loadAppointmentByIdRepository.loadByDay(date)
    return appointment
  }
}
