import { AddSchedule, AddScheduleParams, ScheduleModel, AddScheduleRepository, LoadScheduleByNameRepository } from '.'

export class DbAddSchedule implements AddSchedule {
  constructor (
    private readonly addScheduleRepository: AddScheduleRepository,
    private readonly loadScheduleByNameRepository: LoadScheduleByNameRepository
  ) {}

  async add (scheduleData: AddScheduleParams): Promise<ScheduleModel> {
    const account = await this.loadScheduleByNameRepository.loadByName(scheduleData.name)
    if (!account) {
      const newSchedule = await this.addScheduleRepository.add(Object.assign(
        {}, scheduleData, { status: 'NOT VACCINED', scheduleComments: '' }))
      return newSchedule
    }
    return null as any
  }
}
