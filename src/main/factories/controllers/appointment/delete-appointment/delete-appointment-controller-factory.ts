import { DeleteAppointmentController } from '@/presentation/controllers/appointment/delete-appointment/delete-appointment-controller'
import { Controller } from '@/presentation/protocols'
import { makeDeleteAppointmentValidation } from './delete-appointment-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbDeleteAppointment } from '@/main/factories/usecases/appointment/delete-appointment/db-delete-appointment-factory'
import { makeDbLoadAppointmentById } from '@/main/factories/usecases/appointment/load-appointment-by-id/db-load-appointment-by-id-factory'

export const makeDeleteAppointmentController = (): Controller => {
  const controller = new DeleteAppointmentController(
    makeDbDeleteAppointment(),
    makeDeleteAppointmentValidation(),
    makeDbLoadAppointmentById()
  )
  return makeLogControllerDecorator(controller)
}
