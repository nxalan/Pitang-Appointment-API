import { DbLoadAppointmentsByHour } from '@/data/usecases/appointment/load-appointments-by-hour/db-load-appointments-by-hour'
import { LoadAppointmentsByHour } from '@/domain/usecases/appointment/load-appointments-by-hour'
import { AppointmentMongoRepository } from '@/infra/db/appointment/appointment-mongo-repository'

export const makeDbLoadAppointmentsByHour = (): LoadAppointmentsByHour => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbLoadAppointmentsByHour(appointmentMongoRepository)
}
