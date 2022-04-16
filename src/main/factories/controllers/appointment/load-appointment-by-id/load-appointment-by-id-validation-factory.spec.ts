import { ValidationComposite, IdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeLoadByIdAppointmentValidation } from './load-appointment-by-id-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('LoadByIdAppointmentValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadByIdAppointmentValidation()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new IdValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
