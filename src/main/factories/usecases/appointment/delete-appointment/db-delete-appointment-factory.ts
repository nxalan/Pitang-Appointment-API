import { AppointmentMongoRepository } from '@/infra/db/appointment/appointment-mongo-repository'
import { DeleteAppointment } from '@/domain/usecases/appointment/delete-appointment'
import { DbDeleteAppointment } from '@/data/usecases/appointment/delete-appointment/db-delete-appointment'

export const makeDbDeleteAppointment = (): DeleteAppointment => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbDeleteAppointment(appointmentMongoRepository)
}
