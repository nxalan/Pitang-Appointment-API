import { ValidationComposite, DateValidation, IdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeEditAppointmentValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['id']) {
    validations.push(new IdValidation(field))
  }

  for (const field of ['birthday', 'appointment_date']) {
    validations.push(new DateValidation(field))
  }

  return new ValidationComposite(validations)
}
