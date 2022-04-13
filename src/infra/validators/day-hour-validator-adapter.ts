import { DayHourValidator } from '@/validation/protocols/day-hour-validator'
import { MongoHelper } from '../db/helpers/mongo-helper'
import { endOfDay, startOfDay, startOfHour, endOfHour } from 'date-fns'
import { Collection } from 'mongodb'

export class DateValidatorAdapter implements DayHourValidator {
  isValid (date: Date): boolean {
    let result = true
    MongoHelper.getCollection('appointments')
      .catch(err => { throw (err) })
      .then((collection: Collection) => {
        collection.find({ appointment_date: { $gte: startOfDay(new Date(date)), $lte: endOfDay((new Date(date))) } }).toArray((err, dayResult) => {
          if (err) throw (err)
          if (dayResult.length >= 20) {
            result = false
          }
        })
        collection.find({ appointment_date: { $gte: startOfHour(new Date(date)), $lte: endOfHour((new Date(date))) } }).toArray((err, hourResult) => {
          if (err) throw (err)
          if (hourResult.length >= 2) {
            result = false
          }
        })
      }).catch(err => { throw (err) })
    return result
  }
}
