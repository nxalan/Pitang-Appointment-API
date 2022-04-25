import {
  appointmentWithIdPath,
  appointmentsPath,
  appointmentPath,
  appointmentsRestrictedDatesPath,
  appointmentDeletePath
} from './paths/'

export default {
  '/appointments': appointmentsPath,
  '/appointment/{id}': appointmentWithIdPath,
  '/appointment': appointmentPath,
  '/appointment/delete': appointmentDeletePath,
  '/appointments/restricted-dates': appointmentsRestrictedDatesPath
}
