import { DeleteAppointmentController } from '@/presentation/controllers/appointment/delete-appointment/delete-appointment-controller'
import { Controller } from '@/presentation/protocols'
import { makeDeleteAppointmentValidation } from './delete-appointment-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbDeleteAppointment, makeDbLoadAppointmentById } from '@/main/factories/usecases/appointment'

export const makeDeleteAppointmentController = (): Controller => {
  const controller = new DeleteAppointmentController(
    makeDbDeleteAppointment(),
    makeDeleteAppointmentValidation(),
    makeDbLoadAppointmentById()
  )
  return makeLogControllerDecorator(controller)
}
