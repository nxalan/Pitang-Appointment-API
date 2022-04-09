import { ScheduleModel } from '@/domain/models/schedule'

export type AddScheduleParams = {
  id?: string
  name: string
  email: string
  password: string
}

export interface addSchedule {
  add (schedule: AddScheduleParams): Promise<ScheduleModel>
}
