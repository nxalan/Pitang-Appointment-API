import { ScheduleModel } from '@/domain/models/schedule'
import { AddScheduleParams } from '@/domain/usecases/schedule/add-schedule'

export const mockScheduleModel = (): ScheduleModel => ({
  id: 'any_id',
  name: 'any_name',
  birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
  scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  status: 'NOT VACCINED',
  ScheduleComments: ''
})

export const mockAddScheduleParams = (): AddScheduleParams => ({
  name: 'any_name',
  birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
  scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1))
})
