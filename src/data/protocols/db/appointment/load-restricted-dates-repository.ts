import { RestrictedDatesModel } from '@/domain/models/appointment'

export interface LoadRestrictedDatesRepository {
  load (): Promise<RestrictedDatesModel>
}
