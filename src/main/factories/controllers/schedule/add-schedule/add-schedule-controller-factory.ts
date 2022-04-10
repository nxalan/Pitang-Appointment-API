import { AddScheduleController } from '@/presentation/controllers/schedule/add-schedule/add-schedule-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddScheduleValidation } from './add-schedule-validation-factory'
import { makeDbAddSchedule } from '@/main/factories/usecases/schedule/add-schedule/db-add-schedule-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeAddScheduleController = (): Controller => {
  const controller = new AddScheduleController(
    makeDbAddSchedule(),
    makeAddScheduleValidation()
  )
  return makeLogControllerDecorator(controller)
}
