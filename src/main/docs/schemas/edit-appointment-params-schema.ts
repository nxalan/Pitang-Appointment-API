export const editAppointmentParamsSchema = {
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
    },
    status: {
      type: 'string'
    },
    status_comment: {
      type: 'string'
    }
  }
}
