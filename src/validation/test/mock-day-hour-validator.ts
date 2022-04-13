import { DayHourValidator } from '@/validation/protocols/day-hour-validator'

export const mockDayHourValidator = (): DayHourValidator => {
  class DayHourValidatorStub implements DayHourValidator {
    isValid (date: Date): boolean {
      return true
    }
  }
  return new DayHourValidatorStub()
}
