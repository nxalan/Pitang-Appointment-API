import { AppointmentMongoRepository } from '@/infra/db/appointment/appointment-mongo-repository'
import { EditAppointment } from '@/domain/usecases/appointment/edit-appointment'
import { DbEditAppointment } from '@/data/usecases/appointment/edit-appointment/db-edit-appointment'

export const makeDbEditAppointment = (): EditAppointment => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbEditAppointment(appointmentMongoRepository)
}
