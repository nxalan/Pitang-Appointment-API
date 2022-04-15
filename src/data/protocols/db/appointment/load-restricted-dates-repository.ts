import { RestrictedDatesModel } from '@/domain/models/appointment'

export interface LoadRestrictedDayHourRepository {
  loadRestrictedDates (dateType: string, ammount: number): Promise<string[]>
}

export interface LoadRestrictedDatesRepository {
  load (): Promise<RestrictedDatesModel>
}
