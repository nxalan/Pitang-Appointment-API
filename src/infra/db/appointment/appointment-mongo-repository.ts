import { AddAppointmentRepository, LoadAppointmentByNameRepository } from '@/data/protocols/db/appointment'
import { AddAppointmentParams } from '@/domain/usecases/appointment/add-appointment'
import { AppointmentModel } from '@/domain/models/appointment'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class AppointmentMongoRepository implements AddAppointmentRepository, LoadAppointmentByNameRepository {
  async add (appointmentData: AddAppointmentParams): Promise<AppointmentModel> {
    const appointmentCollection = await MongoHelper.getCollection('appointments')
    const result = await appointmentCollection.findOneAndUpdate({
      _id: new ObjectId(appointmentData.appointment_id)
    }, {
      $set: {
        name: appointmentData.name,
        birthday: appointmentData.birthday,
        appointment_date: appointmentData.appointment_date,
        status: appointmentData.status,
        status_comment: appointmentData.status
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })
    return result.value && MongoHelper.map(result.value)
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
}
