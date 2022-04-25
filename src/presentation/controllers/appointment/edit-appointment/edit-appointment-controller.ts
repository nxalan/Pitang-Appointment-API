import { HttpResponse, HttpRequest, Controller, EditAppointment, Validation, LoadAppointmentById } from '.'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class EditAppointmentController implements Controller {
  constructor (
    private readonly editAppointment: EditAppointment,
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
      const appointment = await this.editAppointment.edit({
        id: httpRequest.params.id,
        name: httpRequest.body?.name,
        birthday: httpRequest.body?.birthday,
        appointment_date: httpRequest.body?.appointment_date,
        status: httpRequest.body?.status,
        status_comment: httpRequest.body?.status_comment
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
