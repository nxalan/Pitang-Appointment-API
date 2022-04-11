import { AddAppointment, AddAppointmentParams, AppointmentModel, AddAppointmentRepository, LoadAppointmentByNameRepository } from '.'

export class DbAddAppointment implements AddAppointment {
  constructor (
    private readonly addAppointmentRepository: AddAppointmentRepository,
    private readonly loadAppointmentByNameRepository: LoadAppointmentByNameRepository
  ) {}

  async add (appointmentData: AddAppointmentParams): Promise<AppointmentModel> {
    const appointment = await this.loadAppointmentByNameRepository.loadByName(appointmentData.name)
    if (!appointment) {
      const newAppointment = await this.addAppointmentRepository.add(Object.assign(
        {}, appointmentData, { status: 'NOT VACCINED', status_comment: '' }))
      return newAppointment
    }
    return null as any
  }
}
