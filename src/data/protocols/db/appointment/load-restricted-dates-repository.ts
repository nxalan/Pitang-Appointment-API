import { RestrictedDatesModel } from '@/domain/models/appointment'

export interface LoadRestrictedDaysAndHoursRepository {
  load (dateType: string, ammount: number): Promise<string[]>
}

export interface LoadRestrictedDatesDataModel {
  load (): Promise<RestrictedDatesModel>
}
