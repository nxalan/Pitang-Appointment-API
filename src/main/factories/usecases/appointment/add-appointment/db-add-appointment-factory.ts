import { AppointmentMongoRepository } from '@/infra/db/appointment/appointment-mongo-repository'
import { AddAppointment } from '@/domain/usecases/appointment/add-appointment'
import { DbAddAppointment } from '@/data/usecases/appointment/add-appointment/db-add-appointment'

export const makeDbAddAppointment = (): AddAppointment => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbAddAppointment(appointmentMongoRepository)
}
