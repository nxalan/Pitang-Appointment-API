import { ValidationComposite, IdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDeleteAppointmentValidation } from './delete-appointment-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('EditAppointmentValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteAppointmentValidation()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new IdValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
