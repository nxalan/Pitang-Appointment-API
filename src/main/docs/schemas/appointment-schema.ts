export const appointmentSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
