import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import app from '@/main/config/app'

let appointmentCollection: Collection

describe('Login Routes', () => {
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
      const appointment = {
        name: 'any_name',
        birthday: new Date(),
        appointmentdDate: new Date()
      }
      const response = await request(app).post('/api/appointment').send(appointment)
      expect(response.status).toBe(200)
    })
  })
})
