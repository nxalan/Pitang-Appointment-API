import { ValidationComposite, DateValidation, DayValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeEditAppointmentValidation } from './edit-appointment-validation-factory'
import { mockDateValidator } from '@/validation/test'
import { makeDbLoadAppointmentsByDay } from '@/main/factories/usecases/appointment/load-appointments-by-day/db-load-appointments-by-day-factory'

jest.mock('@/validation/validators/validation-composite')

describe('EditAppointmentValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeEditAppointmentValidation()
    const validations: Validation[] = []
    for (const field of ['birthday', 'appointment_date']) {
      validations.push(new DateValidation(field, mockDateValidator()))
    }
    for (const field of ['appointment_date']) {
      validations.push(new DayValidation(field, makeDbLoadAppointmentsByDay()))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
