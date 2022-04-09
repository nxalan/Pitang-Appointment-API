import { ScheduleModel } from '@/domain/models/schedule'

export type AddScheduleParams = {
  id?: string
  name: string
  birthday: Date
  scheduledDate: Date
}

export interface AddSchedule {
  add (schedule: AddScheduleParams): Promise<ScheduleModel>
}
