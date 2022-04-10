import { ScheduleMongoRepository } from '@/infra/db/schedule/schedule-mongo-repository'
import { AddSchedule } from '@/domain/usecases/schedule/add-schedule'
import { DbAddSchedule } from '@/data/usecases/schedule/add-schedule/db-add-schedule'

export const makeDbAddSchedule = (): AddSchedule => {
  const scheduleMongoRepository = new ScheduleMongoRepository()
  return new DbAddSchedule(scheduleMongoRepository, scheduleMongoRepository)
}
