import { AppointmentModel, LoadAppointmentById, LoadAppointmentByIdRepository } from './'

export class DbLoadAppointmentById implements LoadAppointmentById {
  constructor (private readonly loadAppointmentByIdRepository: LoadAppointmentByIdRepository) {}

  async loadById (id: string): Promise<AppointmentModel> {
    const appointment = await this.loadAppointmentByIdRepository.loadById(id)
    return appointment
  }
}
