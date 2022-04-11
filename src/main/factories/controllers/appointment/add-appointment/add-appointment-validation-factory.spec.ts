import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddAppointmentValidation } from './add-appointment-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('AddAppointmentValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddAppointmentValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'birthday', 'appointment_date']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
