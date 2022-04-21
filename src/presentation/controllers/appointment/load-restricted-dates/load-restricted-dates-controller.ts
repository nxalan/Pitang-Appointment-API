import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadRestrictedDates } from '.'

export class LoadRestrictedDatesController implements Controller {
  constructor (private readonly loadRestrictedDates: LoadRestrictedDates) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const restrictedDates = await this.loadRestrictedDates.load()
      return ok(restrictedDates)
    } catch (error) {
      return serverError(error)
    }
  }
}
