import { AddScheduleRepository, LoadScheduleByNameRepository } from '.'
import { DbAddSchedule } from './db-add-schedule'
import { mockAddScheduleParams } from '@/domain/test'
import { mockAddScheduleRepository, mockLoadScheduleByNameRepository } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddSchedule
  addScheduleRepositoryStub: AddScheduleRepository
  loadScheduleByNameRepositoryStub: LoadScheduleByNameRepository
}

const makeSut = (): SutTypes => {
  const addScheduleRepositoryStub = mockAddScheduleRepository()
  const loadScheduleByNameRepositoryStub = mockLoadScheduleByNameRepository()
  jest.spyOn(loadScheduleByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null as any))
  const sut = new DbAddSchedule(addScheduleRepositoryStub, loadScheduleByNameRepositoryStub)
  return {
    sut,
    addScheduleRepositoryStub,
    loadScheduleByNameRepositoryStub
  }
}

describe('DbAddSchedule Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call AddScheduleRepository with correct values', async () => {
    const { sut, addScheduleRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addScheduleRepositoryStub, 'add')
    await sut.add(mockAddScheduleParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1))
    })
  })
})
