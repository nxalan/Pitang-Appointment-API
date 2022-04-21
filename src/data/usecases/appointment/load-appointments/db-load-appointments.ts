import { AppointmentModel, LoadAppointments, LoadAppointmentsRepository } from '.'

export class DbLoadAppointments implements LoadAppointments {
  constructor (private readonly loadAppointmentsRepository: LoadAppointmentsRepository) {}

  async load (): Promise<AppointmentModel[]> {
    const appointments = await this.loadAppointmentsRepository.loadAll()
    return appointments
  }
}
