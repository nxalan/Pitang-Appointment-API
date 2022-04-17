import { RestrictedDatesModel, LoadRestrictedDates, LoadRestrictedDaysAndHoursRepository } from '.'

export class DbLoadRestrictedDates implements LoadRestrictedDates {
  constructor (
    private readonly loadRestrictedDaysRepository: LoadRestrictedDaysAndHoursRepository,
    private readonly loadRestrictedHoursRepository: LoadRestrictedDaysAndHoursRepository
  ) {}

  async load (): Promise<RestrictedDatesModel> {
    const restrictedDatesList = await this.loadRestrictedDaysRepository.load('day', 20)
    const restrictedHoursList = await this.loadRestrictedHoursRepository.load('hour', 2)
    const restrictedDates = {
      restrictedDays: restrictedDatesList,
      restrictedHours: restrictedHoursList
    }
    return restrictedDates
  }
}
