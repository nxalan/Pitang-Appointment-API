import { AppointmentModel, DeleteAppointment, DeleteAppointmentRepository } from '.'

export class DbDeleteAppointment implements DeleteAppointment {
  constructor (private readonly deleteAppointmentRepository: DeleteAppointmentRepository) {}

  async delete (id: string): Promise<AppointmentModel> {
    const appointment = await this.deleteAppointmentRepository.delete(id)
    return appointment
  }
}
