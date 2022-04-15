import { RestrictedDatesModel } from '@/domain/models/appointment'

export interface LoadRestrictedDates {
  load (): Promise<RestrictedDatesModel>
}
