import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class DateValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) { }

  async validate (input: any): Promise<Error | undefined> {
    if (typeof input[this.fieldName] === 'undefined') {
      return Promise.resolve(undefined)
    }
    let isValid = true
    if (isNaN(new Date(input[this.fieldName]).getDate())) {
      isValid = false
    }
    if (!isValid) {
      return Promise.resolve(new InvalidParamError(this.fieldName))
    }
  }
}
