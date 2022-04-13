import { DayValidator } from '@/validation/protocols/day-validator'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { endOfDay, startOfDay } from 'date-fns'
import { Collection } from 'mongodb'

export class DayValidatorAdapter implements DayValidator {
  async isValid (date: Date): Promise<boolean> {
    let result = true
    if (typeof date === 'undefined') {
      return result
    }
    const appointmentCollection = await MongoHelper.getCollection('appointments')
    const daysList = await appointmentCollection.find({ appointment_date: { $gte: startOfDay(new Date(date)), $lte: endOfDay((new Date(date))) } }).toArray()
    if (daysList.length >= 20) {
      result = false
    }
    /*
    MongoHelper.getCollection('appointments')
      .then((collection: Collection) => {
        console.log(collection)
        collection.find({ appointment_date: { $gte: startOfDay(new Date(date)), $lte: endOfDay((new Date(date))) } }).toArray()
          .then(dayResult => {
            if (dayResult.length >= 20) {
              result = false
            }
          }).catch(err => { console.log(err) })
      }).catch(err => { console.log(err) })
      */
    return result
  }
}
