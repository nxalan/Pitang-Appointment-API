import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadAppointmentById } from './load-appointment-by-id-controller-protocols'

export class LoadAppointmentByIdController implements Controller {
  constructor (
    private readonly loadAppointmentById: LoadAppointmentById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
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
