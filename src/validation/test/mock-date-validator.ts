import { DateValidator } from '@/validation/protocols/date-validator'

export const mockDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    isValid (date: Date): boolean {
      return true
    }
  }
  return new DateValidatorStub()
}
