import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddAppointmentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'birthday', 'appointmentdDate']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
