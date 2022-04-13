import { InvalidParamError } from '@/presentation/errors'
import { DayValidator } from '@/validation/protocols/day-validator'
import { Validation } from '@/presentation/protocols/validation'

export class DayValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dayValidator: DayValidator
  ) {}

  validate (input: any): Error | undefined {
    const isValid = this.dayValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
