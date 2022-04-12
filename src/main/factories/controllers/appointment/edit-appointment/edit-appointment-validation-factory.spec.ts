import { RequiredFieldValidation, ValidationComposite, DateValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeEditAppointmentValidation } from './edit-appointment-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('EditAppointmentValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeEditAppointmentValidation()
    const validations: Validation[] = []
    for (const field of ['appointment_id']) {
      validations.push(new RequiredFieldValidation(field))
    }
    /*
    for (const field of ['birthday', 'appointment_date']) {
      validations.push(new DateValidation(field, mockDateValidator()))
    }
    */
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
