import { ValidationComposite, DateValidation, IdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeEditAppointmentValidation } from './edit-appointment-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('EditAppointmentValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeEditAppointmentValidation()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new IdValidation(field))
    }
    for (const field of ['birthday', 'appointment_date']) {
      validations.push(new DateValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
