import { DbLoadAppointmentsByDay } from '@/data/usecases/appointment/load-appointments-by-day/db-load-appointments-by-day'
import { LoadAppointmentsByDay } from '@/domain/usecases/appointment/load-appointments-by-day'
import { AppointmentMongoRepository } from '@/infra/db/appointment/appointment-mongo-repository'

export const makeDbLoadAppointmentsByDay = (): LoadAppointmentsByDay => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbLoadAppointmentsByDay(appointmentMongoRepository)
}
