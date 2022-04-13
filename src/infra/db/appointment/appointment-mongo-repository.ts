import { AddAppointmentRepository, LoadAppointmentByNameRepository } from '@/data/protocols/db/appointment'
import { AddAppointmentParams } from '@/domain/usecases/appointment/add-appointment'
import { AppointmentModel } from '@/domain/models/appointment'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { EditAppointmentParams } from '@/domain/usecases/appointment/edit-appointment'

export class AppointmentMongoRepository implements AddAppointmentRepository, LoadAppointmentByNameRepository {
  async add (appointmentData: AddAppointmentParams): Promise<AppointmentModel> {
    const accountCollection = await MongoHelper.getCollection('appointments')
    const result = await accountCollection.insertOne(appointmentData)
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
}
