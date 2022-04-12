import { HttpResponse, HttpRequest, Controller, AddAppointment, Validation } from '.'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError, NameInUseError } from '@/presentation/errors'

export class AddAppointmentController implements Controller {
  constructor (
    private readonly addAppointment: AddAppointment,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, birthday, appointment_date } = httpRequest.body
      const appointment = await this.addAppointment.add({
        name,
        birthday,
        appointment_date
      })
      return ok(appointment)
    } catch (error) {
      return serverError(error)
    }
  }
}
