import { mockScheduleModel } from '@/domain/test'
import { AddScheduleRepository } from '@/data/protocols/db/schedule'
import { ScheduleModel, AddScheduleParams, LoadScheduleByNameRepository } from '@/data/usecases/schedule/add-schedule'

export const mockAddScheduleRepository = (): AddScheduleRepository => {
  class AddScheduleRepositoryStub implements AddScheduleRepository {
    async add (scheduleData: AddScheduleParams): Promise<ScheduleModel> {
      return new Promise(resolve => resolve(mockScheduleModel()))
    }
  }
  return new AddScheduleRepositoryStub()
}

export const mockLoadScheduleByNameRepository = (): LoadScheduleByNameRepository => {
  class LoadScheduleByNameRepositoryStub implements LoadScheduleByNameRepository {
    async loadByName (name: string): Promise<ScheduleModel> {
      return new Promise(resolve => resolve(mockScheduleModel()))
    }
  }
  return new LoadScheduleByNameRepositoryStub()
}
