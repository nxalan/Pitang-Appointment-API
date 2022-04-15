import { DbLoadRestrictedDates } from '@/data/usecases/appointment/load-restricted-dates/db-load-restricted-dates'
import { LoadRestrictedDates } from '@/domain/usecases/appointment/load-restricted-dates'
import { AppointmentMongoRepository } from '@/infra/db/appointment/appointment-mongo-repository'

export const makeDbLoadRestrictedDates = (): LoadRestrictedDates => {
  const appointmentMongoRepository = new AppointmentMongoRepository()
  return new DbLoadRestrictedDates(appointmentMongoRepository, appointmentMongoRepository)
}
