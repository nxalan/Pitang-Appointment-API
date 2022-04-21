import { AddAppointmentRepository, EditAppointmentRepository, LoadAppointmentByIdRepository, LoadAppointmentsByDayRepository, LoadAppointmentsByHourRepository, LoadAppointmentsRepository, LoadRestrictedDaysAndHoursRepository } from '@/data/protocols/db/appointment'
import { AddAppointmentParams, EditAppointmentParams } from '@/domain/usecases/appointment'
import { AppointmentModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { endOfDay, endOfHour, startOfDay, startOfHour } from 'date-fns'

export class AppointmentMongoRepository implements AddAppointmentRepository, EditAppointmentRepository, LoadAppointmentByIdRepository, LoadAppointmentsByDayRepository, LoadAppointmentsByHourRepository, LoadAppointmentsRepository, LoadRestrictedDaysAndHoursRepository {
  async add (appointmentData: AddAppointmentParams): Promise<AppointmentModel> {
    const appointmentCollection = await MongoHelper.getCollection('appointments')
    const result = await appointmentCollection.insertOne(appointmentData)
    const resultOnlyId = { _id: result.insertedId.toString() }
    return MongoHelper.map(resultOnlyId)
  }

  async edit (appointmentData: EditAppointmentParams): Promise<AppointmentModel> {
    const appointmentDataDb = MongoHelper.unmap(appointmentData)
    const requestIsEmpty = Object.keys(appointmentDataDb).length === 0
    if (requestIsEmpty) {
      return this.loadById(appointmentData.id)
    } else {
      const appointmentCollection = await MongoHelper.getCollection('appointments')
      const result = await appointmentCollection.findOneAndUpdate({
        _id: new ObjectId(appointmentData.id)
      }, {
        $set: appointmentDataDb
      }, {
        returnDocument: 'after'
      })
      return result.value && MongoHelper.map(result.value)
    }
  }

  async loadById (id: string): Promise<AppointmentModel> {
    const appointmentCollection = await MongoHelper.getCollection('appointments')
    const appointment = await appointmentCollection.findOne({ _id: new ObjectId(id) })
    return appointment && MongoHelper.map(appointment)
  }

  async loadByDay (date: string): Promise<AppointmentModel[]> {
    const appointmentCollection = await MongoHelper.getCollection('appointments')
    const appointmentsList = await appointmentCollection.find(
      { appointment_date: { $gte: startOfDay(new Date(date)).toISOString(), $lte: endOfDay(new Date(date)).toISOString() } }).toArray()
    return appointmentsList && MongoHelper.mapCollection(appointmentsList)
  }

  async loadByHour (date: string): Promise<AppointmentModel[]> {
    const appointmentCollection = await MongoHelper.getCollection('appointments')
    const appointmentsList = await appointmentCollection.find(
      { appointment_date: { $gte: startOfHour(new Date(date)).toISOString(), $lte: endOfHour(new Date(date)).toISOString() } }).toArray()
    return appointmentsList && MongoHelper.mapCollection(appointmentsList)
  }

  async loadAll (): Promise<AppointmentModel[]> {
    const appointmentsCollection = await MongoHelper.getCollection('appointments')
    const appointments = await appointmentsCollection.find().toArray()
    return MongoHelper.mapCollection(appointments)
  }

  async delete (id: string): Promise<AppointmentModel> {
    const appointmentsCollection = await MongoHelper.getCollection('appointments')
    const appointment = await appointmentsCollection.findOneAndDelete({ _id: new ObjectId(id) })
    return appointment && appointment.value && MongoHelper.map(appointment.value)
  }

  async load (dateType: string, ammount: number): Promise<string[]> {
    const appointmentsCollection = await MongoHelper.getCollection('appointments')
    const restrictedDates = appointmentsCollection.aggregate([
      {
        $group: {
          _id: {
            $dateTrunc: {
              date: { $toDate: '$appointment_date' },
              unit: dateType
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gte: ammount }
        }
      },
      {
        $project: {
          _id: 0,
          appointment_date: '$_id'
        }
      }
    ])
    const invalidDates = await restrictedDates.toArray()
    const invalidDatesList = invalidDates.map((cb) => cb.appointment_date)
    return invalidDatesList
  }
}
