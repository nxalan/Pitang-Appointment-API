import { DateValidator } from '@/validation/protocols/date-validator'

export const mockDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    async isValid (date: Date): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new DateValidatorStub()
}
