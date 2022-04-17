export const appointmentRestrictedDatesSchema = {
  type: 'object',
  properties: {
    restrictedDays: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    restrictedHours: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}
