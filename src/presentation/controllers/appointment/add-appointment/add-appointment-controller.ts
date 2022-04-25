import { HttpResponse, HttpRequest, Controller, AddAppointment, Validation } from '.'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'

export class AddAppointmentController implements Controller {
  constructor (
    private readonly addAppointment: AddAppointment,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const { name, birthday, appointment_date } = httpRequest.body
      const appointment = await this.addAppointment.add({
        name,
        birthday,
        appointment_date
      })
      if (appointment instanceof Error) {
        return forbidden(appointment)
      }
      return ok(appointment)
    } catch (error) {
      return serverError(error)
    }
  }
}
