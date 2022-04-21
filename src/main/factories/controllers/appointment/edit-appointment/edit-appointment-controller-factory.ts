import { EditAppointmentController } from '@/presentation/controllers/appointment/edit-appointment/edit-appointment-controller'
import { Controller } from '@/presentation/protocols'
import { makeEditAppointmentValidation } from './edit-appointment-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbEditAppointment, makeDbLoadAppointmentById } from '@/main/factories/usecases/appointment'

export const makeEditAppointmentController = (): Controller => {
  const controller = new EditAppointmentController(
    makeDbEditAppointment(),
    makeDbLoadAppointmentById(),
    makeEditAppointmentValidation()
  )
  return makeLogControllerDecorator(controller)
}
