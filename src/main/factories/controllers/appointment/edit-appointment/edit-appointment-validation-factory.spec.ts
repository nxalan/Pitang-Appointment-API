import { ValidationComposite, DateValidation, DayValidation, HourValidation, IdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeEditAppointmentValidation } from './edit-appointment-validation-factory'
import { makeDbLoadAppointmentsByDay, makeDbLoadAppointmentsByHour } from '@/main/factories/usecases/appointment'

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
    for (const field of ['appointment_date']) {
      validations.push(new DayValidation(field, makeDbLoadAppointmentsByDay()))
    }
    for (const field of ['appointment_date']) {
      validations.push(new HourValidation(field, makeDbLoadAppointmentsByHour()))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
