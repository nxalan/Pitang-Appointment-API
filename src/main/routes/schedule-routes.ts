/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeAddScheduleController } from '@/main/factories/controllers/schedule/add-schedule/add-schedule-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
export default (router: Router): void => {
  router.post('/schedule', adaptRoute(makeAddScheduleController()))
}
