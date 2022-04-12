import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import app from '@/main/config/app'
import { HttpResponse } from '@/presentation/protocols'

let appointmentCollection: Collection

const mockAppointment = async (): Promise<HttpResponse> => {
  const appointment = {
    name: 'any_name',
    birthday: new Date(),
    appointment_date: new Date()
  }
  const response = await request(app).post('/api/appointment').send(appointment)
  return response
}

describe('Appointment Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    appointmentCollection = await MongoHelper.getCollection('appointments')
    await appointmentCollection.deleteMany({})
  })

  describe('POST /appointment', () => {
    test('Should return 200 on add-appointment', async () => {
      const response = await mockAppointment()
      expect(response.statusCode).toBe(200)
    })

    test('Should return 200 on edit-appointment with a valid appointment_id', async () => {
      const storedMockAppointment = await mockAppointment()
      const { id } = storedMockAppointment.body
      const modifiedAppointment = {
        name: 'modified_name',
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
        appointment_date: new Date(new Date().setDate(new Date().getDate() + 1)),
        status: 'modified_status',
        status_comment: 'modified_status_comment'
      }
      const response = await request(app).put(`/api/appointment/${id}`).send(modifiedAppointment)
      expect(response.statusCode).toBe(200)
    })
  })
})
