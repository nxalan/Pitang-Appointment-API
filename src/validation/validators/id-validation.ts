import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'
import { ObjectId } from 'mongodb'

export class IdValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  async validate (input: any): Promise<Error | undefined> {
    if (!(ObjectId.isValid(input[this.fieldName]))) {
      return Promise.resolve(new InvalidParamError(this.fieldName))
    }
  }
}
