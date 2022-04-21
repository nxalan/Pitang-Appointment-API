import { AppointmentModel, LoadAppointmentsByHour, LoadAppointmentsByHourRepository } from '.'

export class DbLoadAppointmentsByHour implements LoadAppointmentsByHour {
  constructor (private readonly loadAppointmentByHourRepository: LoadAppointmentsByHourRepository) {}

  async loadByHour (date: string): Promise<AppointmentModel[]> {
    const appointment = await this.loadAppointmentByHourRepository.loadByHour(date)
    return appointment
  }
}
