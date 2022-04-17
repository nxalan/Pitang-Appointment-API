export const appointmentPath = {
  post: {
    tags: ['Agendamentos'],
    summary: 'API para criar um agendamento',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addAppointmentParams'
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
              $ref: '#/schemas/appointment'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
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
