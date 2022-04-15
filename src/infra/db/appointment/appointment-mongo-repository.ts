import { AddAppointmentRepository, EditAppointmentRepository, LoadAppointmentByIdRepository, LoadAppointmentByNameRepository, LoadAppointmentsByDayRepository, LoadAppointmentsByHourRepository, LoadAppointmentsRepository } from '@/data/protocols/db/appointment'
import { AddAppointmentParams } from '@/domain/usecases/appointment/add-appointment'
import { AppointmentModel } from '@/domain/models/appointment'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { EditAppointmentParams } from '@/domain/usecases/appointment/edit-appointment'
import { endOfDay, endOfHour, startOfDay, startOfHour } from 'date-fns'

export class AppointmentMongoRepository implements AddAppointmentRepository, EditAppointmentRepository, LoadAppointmentByNameRepository, LoadAppointmentByIdRepository, LoadAppointmentsByDayRepository, LoadAppointmentsByHourRepository, LoadAppointmentsRepository {
  async add (appointmentData: AddAppointmentParams): Promise<AppointmentModel> {
    const appointmentCollection = await MongoHelper.getCollection('appointments')
    const result = await appointmentCollection.insertOne(appointmentData)
    return MongoHelper.map(result.ops[0])
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

  async loadByName (name: string): Promise<AppointmentModel> {
    const appointmentCollection = await MongoHelper.getCollection('appointments')
    const appointment = await appointmentCollection.findOne({ name })
    return appointment && MongoHelper.map(appointment)
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
}
