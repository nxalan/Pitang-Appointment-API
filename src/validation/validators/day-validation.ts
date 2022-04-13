import { InvalidParamError } from '@/presentation/errors'
import { DayValidator } from '@/validation/protocols/day-validator'
import { Validation } from '@/presentation/protocols/validation'

export class DayValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dayValidator: DayValidator
  ) {}

  async validate (input: any): Promise<Error | undefined> {
    const isValid = await this.dayValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
