import { AppointmentMongoRepository } from '@/infra/db/appointment/appointment-mongo-repository'
import { AddAppointment, DeleteAppointment, EditAppointment, LoadAppointmentById, LoadAppointments, LoadAppointmentsByDay, LoadAppointmentsByHour, LoadRestrictedDates } from '@/domain/usecases/appointment'
import { DbAddAppointment } from '@/data/usecases/appointment/add-appointment/db-add-appointment'
import { DbDeleteAppointment } from '@/data/usecases/appointment/delete-appointment/db-delete-appointment'
import { DbEditAppointment } from '@/data/usecases/appointment/edit-appointment/db-edit-appointment'
import { DbLoadAppointmentById } from '@/data/usecases/appointment/load-appointment-by-id/db-load-appointment-by-id'
import { DbLoadAppointments } from '@/data/usecases/appointment/load-appointments/db-load-appointments'
import { DbLoadAppointmentsByDay } from '@/data/usecases/appointment/load-appointments-by-day/db-load-appointments-by-day'
import { DbLoadAppointmentsByHour } from '@/data/usecases/appointment/load-appointments-by-hour/db-load-appointments-by-hour'
import { DbLoadRestrictedDates } from '@/data/usecases/appointment/load-restricted-dates/db-load-restricted-dates'

export const makeDbAddAppointment = (): AddAppointment => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbAddAppointment(appointmentMongoRepository, appointmentMongoRepository, appointmentMongoRepository)
}

export const makeDbDeleteAppointment = (): DeleteAppointment => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbDeleteAppointment(appointmentMongoRepository)
}

export const makeDbEditAppointment = (): EditAppointment => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbEditAppointment(appointmentMongoRepository, appointmentMongoRepository, appointmentMongoRepository)
}

export const makeDbLoadAppointmentById = (): LoadAppointmentById => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbLoadAppointmentById(appointmentMongoRepository)
}

export const makeDbLoadAppointments = (): LoadAppointments => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbLoadAppointments(appointmentMongoRepository)
}

export const makeDbLoadAppointmentsByDay = (): LoadAppointmentsByDay => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbLoadAppointmentsByDay(appointmentMongoRepository)
}

export const makeDbLoadAppointmentsByHour = (): LoadAppointmentsByHour => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbLoadAppointmentsByHour(appointmentMongoRepository)
}

export const makeDbLoadRestrictedDates = (): LoadRestrictedDates => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbLoadRestrictedDates(appointmentMongoRepository, appointmentMongoRepository)
}
