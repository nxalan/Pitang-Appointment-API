import {
  errorSchema,
  appointmentsSchema,
  appointmentSchema,
  addAppointmentParamsSchema,
  editAppointmentParamsSchema,
  appointmentRestrictedDatesSchema,
  appointmentIdSchema
} from './schemas/'

export default {
  error: errorSchema,
  appointment: appointmentSchema,
  appointments: appointmentsSchema,
  appointmentWithId: appointmentSchema,
  appointmentId: appointmentIdSchema,
  addAppointmentParams: addAppointmentParamsSchema,
  editAppointmentParams: editAppointmentParamsSchema,
  appointmentsRestrictedDates: appointmentRestrictedDatesSchema
}
