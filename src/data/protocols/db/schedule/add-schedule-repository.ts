import { AddScheduleParams } from '@/domain/usecases/schedule/add-schedule'
import { ScheduleModel } from '@/domain/models/schedule'

export interface AddScheduleRepository {
  add (scheduleData: AddScheduleParams): Promise<ScheduleModel>
}
