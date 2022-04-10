import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddScheduleValidation } from './add-schedule-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('AddScheduleValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddScheduleValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'birthday', 'scheduledDate']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
