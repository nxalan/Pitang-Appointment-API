import { EditAppointmentController } from '@/presentation/controllers/appointment/edit-appointment/edit-appointment-controller'
import { Controller } from '@/presentation/protocols'
import { makeEditAppointmentValidation } from './edit-appointment-validation-factory'
import { makeDbEditAppointment } from '@/main/factories/usecases/appointment/edit-appointment/db-edit-appointment-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadAppointmentById } from '@/main/factories/usecases/appointment/load-appointment-by-id/db-load-appointment-by-id-factory'

export const makeEditAppointmentController = (): Controller => {
  const controller = new EditAppointmentController(
    makeDbEditAppointment(),
    makeDbLoadAppointmentById(),
    makeEditAppointmentValidation()
  )
  return makeLogControllerDecorator(controller)
}
