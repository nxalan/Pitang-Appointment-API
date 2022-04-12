import { DateValidator } from '@/validation/protocols/date-validator'
export class DateValidatorAdapter implements DateValidator {
  isValid (date: Date): boolean {
    if (typeof date === 'undefined') {
      return true
    }
    return !isNaN(new Date(date).getDate())
  }
}
