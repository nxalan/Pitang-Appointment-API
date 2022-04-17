export const addAppointmentParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    birthday: {
      type: 'string'
    },
    appointment_date: {
      type: 'string'
    }
  },
  required: ['name', 'birthday', 'appointment_date']
}
