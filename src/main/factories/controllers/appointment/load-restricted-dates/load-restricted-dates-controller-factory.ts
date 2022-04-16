import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadRestrictedDatesController } from '@/presentation/controllers/appointment/load-restricted-dates/load-restricted-dates-controller'
import { makeDbLoadRestrictedDates } from '@/main/factories/usecases/appointment'

export const makeLoadRestrictedDatesController = (): Controller => {
  const controller = new LoadRestrictedDatesController(makeDbLoadRestrictedDates())
  return makeLogControllerDecorator(controller)
}
