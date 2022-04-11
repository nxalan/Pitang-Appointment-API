import { DateValidator } from '@/validation/protocols/date-validator'
import validator from 'validator'

export class DateValidatorAdapter implements DateValidator {
  isValid (date: Date): boolean {
    return validator.isDate(date.toString())
  }
}
