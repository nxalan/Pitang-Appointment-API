export const appointmentsPath = {
  get: {
    tags: ['Agendamentos'],
    summary: 'API para listar todos os agendamentos',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/appointments'
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
