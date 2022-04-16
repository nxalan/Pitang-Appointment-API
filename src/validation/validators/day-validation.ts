import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { LoadAppointmentsByDay } from '@/domain/usecases/appointment'

export class DayValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly loadAppointmentsByDay: LoadAppointmentsByDay
  ) { }

  async validate (input: any): Promise<Error | undefined> {
    if (typeof input[this.fieldName] === 'undefined') {
      return undefined
    }
    let isValid = true
    const daysList = await this.loadAppointmentsByDay.loadByDay(input[this.fieldName])
    if (daysList.length >= 20) {
      isValid = false
    }
    if (!isValid) {
      return new InvalidParamError(`${this.fieldName} day, the chosen day is already full`)
    }
  }
}
