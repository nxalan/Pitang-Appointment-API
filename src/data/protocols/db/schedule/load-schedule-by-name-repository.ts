import { ScheduleModel } from '@/domain/models/schedule'

export interface LoadScheduleByNameRepository {
  loadByName (name: string): Promise<ScheduleModel>
}
