import { AddScheduleParams } from '@/domain/usecases/schedule/add-schedule'
import { ScheduleModel } from '@/domain/models/schedule'

export interface AddAccountRepository {
  add (accountData: AddScheduleParams): Promise<ScheduleModel>
}
