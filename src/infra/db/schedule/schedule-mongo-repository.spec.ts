import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { ScheduleMongoRepository } from './schedule-mongo-repository'
import { mockAddScheduleParams } from '@/domain/test'
import MockDate from 'mockdate'

let scheduleCollection: Collection

describe('Schedule Mongo Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    scheduleCollection = await MongoHelper.getCollection('schedules')
    await scheduleCollection.deleteMany({})
  })

  const makeSut = (): ScheduleMongoRepository => {
    return new ScheduleMongoRepository()
  }

  describe('Add', () => {
    test('Should return an schedule on add success', async () => {
      const sut = makeSut()
      const schedule = await sut.add(mockAddScheduleParams())
      expect(schedule).toBeTruthy()
      expect(schedule.id).toBeTruthy()
      expect(schedule.name).toBe('any_name')
      expect(schedule.birthday).toEqual(new Date(new Date().setFullYear(new Date().getFullYear() - 20)))
      expect(schedule.scheduledDate).toEqual(new Date(new Date().setDate(new Date().getDate() + 1)))
    })
  })
})
