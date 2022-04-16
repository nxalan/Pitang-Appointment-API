import { ValidationComposite, IdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeLoadByIdAppointmentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new IdValidation(field))
  }
  return new ValidationComposite(validations)
}
