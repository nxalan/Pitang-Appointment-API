import { HttpResponse, HttpRequest, Controller, AddSchedule, Validation } from './add-schedule-controller-protocols'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { NameInUseError } from '@/presentation/errors'

export class AddScheduleController implements Controller {
  constructor (
    private readonly addSchedule: AddSchedule,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, birthday, scheduledDate } = httpRequest.body
      const schedule = await this.addSchedule.add({
        name,
        birthday,
        scheduledDate
      })
      if (!schedule) {
        return forbidden(new NameInUseError())
      }
      return ok(schedule)
    } catch (error) {
      return serverError(error)
    }
  }
}
