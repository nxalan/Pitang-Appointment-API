import { DayValidator } from '@/validation/protocols/day-validator'

export const mockDayValidator = (): DayValidator => {
  class DayValidatorStub implements DayValidator {
    isValid (date: Date): boolean {
      return true
    }
  }
  return new DayValidatorStub()
}
