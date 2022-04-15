import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, DeleteAppointment, LoadAppointmentById } from './delete-appointment-controller-protocols'

export class DeleteAppointmentController implements Controller {
  constructor (
    private readonly deleteAppointments: DeleteAppointment,
    private readonly loadAppointmentById: LoadAppointmentById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
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
