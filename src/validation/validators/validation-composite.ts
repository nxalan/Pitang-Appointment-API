import { Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  async validate (input: any): Promise<Error | undefined> {
    const inputValidations = { ...input.body, ...input.params }
    for (const validation of this.validations) {
      const error = await validation.validate(inputValidations)
      if (error) {
        return error
      }
    }
  }
}
