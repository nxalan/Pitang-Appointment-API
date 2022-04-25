export const appointmentDeletePath = {
  post: {
    tags: ['Agendamentos'],
    summary: 'API para excluir um agendamento especifico',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/appointmentId'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/appointmentWithId'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
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
