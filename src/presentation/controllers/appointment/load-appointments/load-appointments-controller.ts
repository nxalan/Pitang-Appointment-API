import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadAppointments } from './load-appointments-controller-protocols'

export class LoadAppointmentsController implements Controller {
  constructor (private readonly loadAppointments: LoadAppointments) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const appointments = await this.loadAppointments.load()
      return ok(appointments)
    } catch (error) {
      return serverError(error)
    }
  }
}
