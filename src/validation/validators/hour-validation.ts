import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'
import { LoadAppointmentsByHour } from '@/domain/usecases/appointment/load-appointments-by-hour'

export class HourValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly loadAppointmentsByHour: LoadAppointmentsByHour
  ) { }

  async validate (input: any): Promise<Error | undefined> {
    if (typeof input[this.fieldName] === 'undefined') {
      return undefined
    }
    let isValid = true
    const hoursList = await this.loadAppointmentsByHour.loadByHour(input[this.fieldName])
    if (hoursList.length >= 2) {
      isValid = false
    }
    if (!isValid) {
      return new InvalidParamError(`${this.fieldName}, the chosen hour is already full`)
    }
  }
}
