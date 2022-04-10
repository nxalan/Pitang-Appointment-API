import { mockScheduleModel } from '@/domain/test'
import { AddSchedule, AddScheduleParams } from '@/domain/usecases/schedule/add-schedule'
import { ScheduleModel } from '@/domain/models/schedule'

export const mockAddSchedule = (): AddSchedule => {
  class AddAccountStub implements AddSchedule {
    async add (schedule: AddScheduleParams): Promise<ScheduleModel> {
      return new Promise(resolve => resolve(mockScheduleModel()))
    }
  }
  return new AddAccountStub()
}
