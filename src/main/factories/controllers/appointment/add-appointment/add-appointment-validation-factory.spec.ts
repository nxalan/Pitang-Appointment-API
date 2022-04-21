import { RequiredFieldValidation, ValidationComposite, DateValidation, DayValidation, HourValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeAddAppointmentValidation } from './add-appointment-validation-factory'
import { makeDbLoadAppointmentsByDay, makeDbLoadAppointmentsByHour } from '@/main/factories/usecases/appointment'

jest.mock('@/validation/validators/validation-composite')

describe('AddAppointmentValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddAppointmentValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'birthday', 'appointment_date']) {
      validations.push(new RequiredFieldValidation(field))
    }
    for (const field of ['birthday', 'appointment_date']) {
      validations.push(new DateValidation(field))
    }
    for (const field of ['appointment_date']) {
      validations.push(new DayValidation(field, makeDbLoadAppointmentsByDay()))
    }
    for (const field of ['appointment_date']) {
      validations.push(new HourValidation(field, makeDbLoadAppointmentsByHour()))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
