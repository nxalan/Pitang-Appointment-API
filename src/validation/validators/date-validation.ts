import { InvalidParamError } from '@/presentation/errors'
import { DateValidator } from '@/validation/protocols/date-validator'
import { Validation } from '@/presentation/protocols/validation'

export class DateValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dateValidator: DateValidator
  ) { }

  async validate (input: any): Promise<Error | undefined> {
    const isValid = await this.dateValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
