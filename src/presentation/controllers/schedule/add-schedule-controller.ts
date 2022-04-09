import { HttpResponse, HttpRequest, Controller, AddSchedule } from './add-schedule-controller-protocols'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { NameInUseError } from '@/presentation/errors'

export class AddScheduleController implements Controller {
  constructor (
    private readonly addSchedule: AddSchedule
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
