import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let appointmentCollection = await sut.getCollection('appointments')
    expect(appointmentCollection).toBeTruthy()
    await sut.disconnect()
    appointmentCollection = await sut.getCollection('appointments')
    expect(appointmentCollection).toBeTruthy()
  })
})
