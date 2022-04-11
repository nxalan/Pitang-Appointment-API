/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeAddAppointmentController } from '@/main/factories/controllers/appointment/add-appointment/add-appointment-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
export default (router: Router): void => {
  router.post('/appointment', adaptRoute(makeAddAppointmentController()))
}
