import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadAppointmentsController } from '@/presentation/controllers/appointment/load-appointments/load-appointments-controller'
import { makeDbLoadAppointments } from '@/main/factories/usecases/appointment/load-appointments/db-load-appointments-factory'

export const makeLoadAppointmentsController = (): Controller => {
  const controller = new LoadAppointmentsController(makeDbLoadAppointments())
  return makeLogControllerDecorator(controller)
}
