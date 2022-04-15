import { DbLoadAppointments } from '@/data/usecases/appointment/load-appointments/db-load-appointments'
import { LoadAppointments } from '@/domain/usecases/appointment/load-appointments'
import { AppointmentMongoRepository } from '@/infra/db/appointment/appointment-mongo-repository'

export const makeDbLoadAppointments = (): LoadAppointments => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbLoadAppointments(appointmentMongoRepository)
}
