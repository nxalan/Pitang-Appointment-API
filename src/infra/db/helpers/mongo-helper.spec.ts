import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let scheduleCollection = await sut.getCollection('schedules')
    expect(scheduleCollection).toBeTruthy()
    await sut.disconnect()
    scheduleCollection = await sut.getCollection('schedules')
    expect(scheduleCollection).toBeTruthy()
  })
})
