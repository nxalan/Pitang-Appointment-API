import { AddScheduleRepository } from '@/data/protocols/db/schedule/add-schedule-repository'
import { AddScheduleParams } from '@/domain/usecases/schedule/add-schedule'
import { ScheduleModel } from '@/domain/models/schedule'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { LoadScheduleByNameRepository } from '@/data/protocols/db/schedule/load-schedule-by-name-repository'

export class ScheduleMongoRepository implements AddScheduleRepository, LoadScheduleByNameRepository {
  async add (scheduleData: AddScheduleParams): Promise<ScheduleModel> {
    const scheduleCollection = await MongoHelper.getCollection('schedules')
    const result = await scheduleCollection.insertOne(scheduleData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByName (name: string): Promise<ScheduleModel> {
    const scheduleCollection = await MongoHelper.getCollection('schedules')
    const schedule = await scheduleCollection.findOne({ name })
    return schedule && MongoHelper.map(schedule)
  }
}
