import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, DeleteAppointment, LoadAppointmentById, Validation } from '.'

export class DeleteAppointmentController implements Controller {
  constructor (
    private readonly deleteAppointments: DeleteAppointment,
    private readonly validation: Validation,
    private readonly loadAppointmentById: LoadAppointmentById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const storedAppointment = await this.loadAppointmentById.loadById(id)
      if (!storedAppointment) {
        return forbidden(new InvalidParamError('id'))
      }
      const appointment = await this.deleteAppointments.delete(id)
      return ok(appointment)
    } catch (error) {
      return serverError(error)
    }
  }
}
