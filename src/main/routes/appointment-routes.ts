/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeAddAppointmentController } from '@/main/factories/controllers/appointment/add-appointment/add-appointment-controller-factory'
import { makeEditAppointmentController } from '@/main/factories/controllers/appointment/edit-appointment/edit-appointment-controller-factory'
import { makeLoadAppointmentsController } from '@/main/factories/controllers/appointment/load-appointments/load-appointments-controller-factory'
import { makeDeleteAppointmentController } from '@/main/factories/controllers/appointment/delete-appointment/delete-appointment-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
export default (router: Router): void => {
  router.get('/appointment', adaptRoute(makeLoadAppointmentsController()))
  router.post('/appointment/', adaptRoute(makeAddAppointmentController()))
  router.put('/appointment/:id', adaptRoute(makeEditAppointmentController()))
  router.delete('/appointment/:id', adaptRoute(makeDeleteAppointmentController()))
}
