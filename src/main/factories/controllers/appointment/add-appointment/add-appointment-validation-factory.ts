import { RequiredFieldValidation, ValidationComposite, DateValidation, DayValidation, HourValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeDbLoadAppointmentsByDay, makeDbLoadAppointmentsByHour } from '@/main/factories/usecases/appointment'

export const makeAddAppointmentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'birthday', 'appointment_date']) {
    validations.push(new RequiredFieldValidation(field))
  }
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
