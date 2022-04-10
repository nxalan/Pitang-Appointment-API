import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import app from '@/main/config/app'

let scheduleCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    scheduleCollection = await MongoHelper.getCollection('schedules')
    await scheduleCollection.deleteMany({})
  })

  describe('POST /schedule', () => {
    test('Should return 200 on add-schedule', async () => {
      const schedule = {
        name: 'any_name',
        birthday: new Date(),
        scheduledDate: new Date()
      }
      const response = await request(app).post('/api/schedule').send(schedule)
      expect(response.status).toBe(200)
    })
  })
})
