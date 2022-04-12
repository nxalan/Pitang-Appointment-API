import { DbLoadAppointmentById } from '@/data/usecases/appointment/load-appointment-by-id/db-load-appointment-by-id'
import { LoadAppointmentById } from '@/domain/usecases/appointment/load-appointment-by-id'
import { AppointmentMongoRepository } from '@/infra/db/appointment/appointment-mongo-repository'

export const makeDbLoadAppointmentById = (): LoadAppointmentById => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbLoadAppointmentById(appointmentMongoRepository)
}
