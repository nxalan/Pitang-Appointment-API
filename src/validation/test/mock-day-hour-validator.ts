import { DayValidator } from '@/validation/protocols/day-validator'

export const mockDayValidator = (): DayValidator => {
  class DayValidatorStub implements DayValidator {
    async isValid (date: Date): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new DayValidatorStub()
}
