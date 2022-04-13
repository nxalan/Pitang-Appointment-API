import { InvalidParamError } from '@/presentation/errors'
import { DayHourValidator } from '@/validation/protocols/day-hour-validator'
import { Validation } from '@/presentation/protocols/validation'

export class DayHourValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dayHourValidator: DayHourValidator
  ) {}

  validate (input: any): Error | undefined {
    const isValid = this.dayHourValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
