import { RequiredFieldValidation, ValidationComposite, DateValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeAddAppointmentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'birthday', 'appointment_date']) {
    validations.push(new RequiredFieldValidation(field))
  }
  for (const field of ['birthday', 'appointment_date']) {
    validations.push(new DateValidation(field))
  }
  return new ValidationComposite(validations)
}
