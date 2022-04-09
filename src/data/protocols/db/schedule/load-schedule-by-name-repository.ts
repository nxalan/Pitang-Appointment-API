import { ScheduleModel } from '@/domain/models/schedule'

export interface LoadAccountByEmailRepository {
  loadByName (email: string): Promise<ScheduleModel>
}
