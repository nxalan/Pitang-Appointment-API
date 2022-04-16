import { ValidationComposite, IdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeDeleteAppointmentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new IdValidation(field))
  }
  return new ValidationComposite(validations)
}
