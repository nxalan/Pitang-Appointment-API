import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadAppointmentById, Validation } from '.'

export class LoadAppointmentByIdController implements Controller {
  constructor (
    private readonly loadAppointmentById: LoadAppointmentById,
    private readonly validation: Validation
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
      return ok(storedAppointment)
    } catch (error) {
      return serverError(error)
    }
  }
}
