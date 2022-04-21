import { ValidationComposite, IdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeDeleteAppointmentValidation } from './delete-appointment-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('DeleteAppointmentValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteAppointmentValidation()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new IdValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
