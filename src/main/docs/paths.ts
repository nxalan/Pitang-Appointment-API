import {
  appointmentWithIdPath,
  appointmentsPath,
  appointmentPath,
  appointmentsRestrictedDatesPath
} from './paths/'

export default {
  '/appointments': appointmentsPath,
  '/appointment/{id}': appointmentWithIdPath,
  '/appointment': appointmentPath,
  '/appointments/restricted-dates': appointmentsRestrictedDatesPath
}
