import { RequiredFieldValidation, ValidationComposite, DateValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { DateValidatorAdapter } from '@/infra/validators/date-validator-adapter'

export const makeAddAppointmentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'birthday', 'appointment_date']) {
    validations.push(new RequiredFieldValidation(field))
  }
  for (const field of ['birthday', 'appointment_date']) {
    validations.push(new DateValidation(field, new DateValidatorAdapter()))
  }
  return new ValidationComposite(validations)
}
