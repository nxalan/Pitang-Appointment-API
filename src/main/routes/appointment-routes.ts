/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeAddAppointmentController } from '@/main/factories/controllers/appointment/add-appointment/add-appointment-controller-factory'
import { makeEditAppointmentController } from '@/main/factories/controllers/appointment/edit-appointment/edit-appointment-controller-factory'
import { makeLoadAppointmentsController } from '@/main/factories/controllers/appointment/load-appointments/load-appointments-controller-factory'
import { makeDeleteAppointmentController } from '@/main/factories/controllers/appointment/delete-appointment/delete-appointment-controller-factory'
import { makeLoadAppointmentByIdController } from '@/main/factories/controllers/appointment/load-appointment-by-id/load-appointment-by-id-controller-factory'
import { makeLoadRestrictedDatesController } from '@/main/factories/controllers/appointment/load-restricted-dates/load-restricted-dates-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/appointments', adaptRoute(makeLoadAppointmentsController()))
  router.get('/appointment/:id', adaptRoute(makeLoadAppointmentByIdController()))
  router.get('/appointments/restricted-dates', adaptRoute(makeLoadRestrictedDatesController()))
  router.post('/appointment', adaptRoute(makeAddAppointmentController()))
  router.put('/appointment/:id', adaptRoute(makeEditAppointmentController()))
  router.delete('/appointment/:id', adaptRoute(makeDeleteAppointmentController()))
}
