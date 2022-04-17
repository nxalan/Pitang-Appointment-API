import { LoadAppointmentByIdController } from '@/presentation/controllers/appointment/load-appointment-by-id/load-appointment-by-id-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadAppointmentById } from '@/main/factories/usecases/appointment'
import { makeLoadByIdAppointmentValidation } from './load-appointment-by-id-validation-factory'

export const makeLoadAppointmentByIdController = (): Controller => {
  const controller = new LoadAppointmentByIdController(
    makeDbLoadAppointmentById(),
    makeLoadByIdAppointmentValidation()
  )
  return makeLogControllerDecorator(controller)
}
