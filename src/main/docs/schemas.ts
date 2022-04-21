import {
  errorSchema,
  appointmentsSchema,
  appointmentSchema,
  addAppointmentParamsSchema,
  editAppointmentParamsSchema,
  appointmentRestrictedDatesSchema
} from './schemas/'

export default {
  error: errorSchema,
  appointment: appointmentSchema,
  appointments: appointmentsSchema,
  appointmentWithId: appointmentSchema,
  addAppointmentParams: addAppointmentParamsSchema,
  editAppointmentParams: editAppointmentParamsSchema,
  appointmentsRestrictedDates: appointmentRestrictedDatesSchema
}
