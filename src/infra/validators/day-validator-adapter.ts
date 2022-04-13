import { DayValidator } from '@/validation/protocols/day-validator'
import { MongoHelper } from '../db/helpers/mongo-helper'
export class DateValidatorAdapter implements DayValidator {
  async isValid (date: Date): boolean {
    const appointmentCollection = await MongoHelper.getCollection('appointments')
  }
}
