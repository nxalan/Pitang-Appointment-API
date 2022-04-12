import { AddAppointmentController } from '@/presentation/controllers/appointment/add-appointment/add-appointment-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddAppointmentValidation } from './add-appointment-validation-factory'
import { makeDbAddAppointment } from '@/main/factories/usecases/appointment/add-appointment/db-add-appointment-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadAppointmentById } from '@/main/factories/usecases/appointment/load-appointment-by-id/db-load-appointment-by-id-factory'

export const makeAddAppointmentController = (): Controller => {
  const controller = new AddAppointmentController(
    makeDbAddAppointment(),
    makeDbLoadAppointmentById(),
    makeAddAppointmentValidation()
  )
  return makeLogControllerDecorator(controller)
}
