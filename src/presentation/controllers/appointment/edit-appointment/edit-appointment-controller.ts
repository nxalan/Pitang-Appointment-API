import { HttpResponse, HttpRequest, Controller, EditAppointment, Validation, LoadAppointmentById } from '.'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class EditAppointmentController implements Controller {
  constructor (
    private readonly editAppointment: EditAppointment,
    private readonly loadAppointmentById: LoadAppointmentById,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
      const storedAppointment = await this.loadAppointmentById.loadById(id)
      if (!storedAppointment) {
        return forbidden(new InvalidParamError('id'))
      }
      const error = await this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const name = httpRequest.body?.name
      const birthday = httpRequest.body?.birthday
      const appointment_date = httpRequest.body?.appointment_date
      const status = httpRequest.body?.status
      const status_comment = httpRequest.body?.status_comment
      const appointment = await this.editAppointment.edit({
        id,
        name,
        birthday,
        appointment_date,
        status,
        status_comment
      })
      return ok(appointment)
    } catch (error) {
      return serverError(error)
    }
  }
}
