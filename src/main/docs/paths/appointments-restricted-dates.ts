export const appointmentsRestrictedDatesPath = {
  get: {
    tags: ['Agendamentos'],
    summary: 'API para listar todos os dias e horários restritos',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/appointmentsRestrictedDates'
            }
          }
        }
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
