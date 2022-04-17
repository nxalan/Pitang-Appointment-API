export const appointmentsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/appointment'
  }
}
