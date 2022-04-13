import { DayValidator } from '@/validation/protocols/day-validator'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { endOfDay, startOfDay } from 'date-fns'
import { Collection } from 'mongodb'

export class DayValidatorAdapter implements DayValidator {
  isValid (date: Date): boolean {
    let result = true
    if (typeof date === 'undefined') {
      return result
    }
    MongoHelper.getCollection('appointments')
      .catch(err => { throw (err) })
      .then((collection: Collection) => {
        collection.find({ appointment_date: { $gte: startOfDay(new Date(date)), $lte: endOfDay((new Date(date))) } }).toArray((err, dayResult) => {
          console.log(err)
          if (err) throw (err)
          if (dayResult.length >= 20) {
            result = false
          }
        })
      }).catch(err => { throw (err) })
    return result
  }
}
