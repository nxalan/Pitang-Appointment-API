import { RestrictedDatesModel, LoadRestrictedDates, LoadRestrictedDatesRepository } from './db-load-restricted-dates-protocols'

export class DbLoadRestrictedDates implements LoadRestrictedDates {
  constructor (private readonly loadRestrictedDatesRepository: LoadRestrictedDatesRepository) {}

  async load (): Promise<RestrictedDatesModel> {
    const restrictedDates = await this.loadRestrictedDatesRepository.load()
    return restrictedDates
  }
}
