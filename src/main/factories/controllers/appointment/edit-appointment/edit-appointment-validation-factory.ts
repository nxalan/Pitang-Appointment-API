import { ValidationComposite, DateValidation, DayValidation, HourValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDbLoadAppointmentsByDay } from '@/main/factories/usecases/appointment/load-appointments-by-day/db-load-appointments-by-day-factory'
import { makeDbLoadAppointmentsByHour } from '@/main/factories/usecases/appointment/load-appointments-by-hour/db-load-appointments-by-hour-factory'

export const makeEditAppointmentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['birthday', 'appointment_date']) {
    validations.push(new DateValidation(field))
  }

  for (const field of ['appointment_date']) {
    validations.push(new DayValidation(field, makeDbLoadAppointmentsByDay()))
  }

  for (const field of ['appointment_date']) {
    validations.push(new HourValidation(field, makeDbLoadAppointmentsByHour()))
  }

  return new ValidationComposite(validations)
}
