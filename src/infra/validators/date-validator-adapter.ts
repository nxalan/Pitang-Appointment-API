import { DateValidator } from '@/validation/protocols/date-validator'
export class DateValidatorAdapter implements DateValidator {
  async isValid (date: Date): Promise<boolean> {
    if (typeof date === 'undefined') {
      return Promise.resolve(true)
    }
    return Promise.resolve(!isNaN(new Date(date).getDate()))
  }
}
