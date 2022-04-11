import { DateValidator } from '@/validation/protocols/date-validator'
export class DateValidatorAdapter implements DateValidator {
  isValid (date: Date): boolean {
    return !isNaN(new Date(date).getDate())
  }
}
