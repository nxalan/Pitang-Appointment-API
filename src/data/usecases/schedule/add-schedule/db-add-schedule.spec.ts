import { AddScheduleRepository, LoadScheduleByNameRepository } from '.'
import { DbAddSchedule } from './db-add-schedule'
import { mockAddScheduleParams, mockScheduleModel, throwError } from '@/domain/test'
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
      scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      status: 'NOT VACCINED',
      scheduleComments: ''
    })
  })

  test('Should throw if AddScheduleRepository throws', async () => {
    const { sut, addScheduleRepositoryStub } = makeSut()
    jest.spyOn(addScheduleRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddScheduleParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an schedule on success', async () => {
    const { sut } = makeSut()
    const schedule = await sut.add(mockAddScheduleParams())
    expect(schedule).toEqual(mockScheduleModel())
  })

  test('Should return null if LoadScheduleByNameRepository not return null', async () => {
    const { sut, loadScheduleByNameRepositoryStub } = makeSut()
    jest.spyOn(loadScheduleByNameRepositoryStub, 'loadByName').mockReturnValueOnce(Promise.resolve(mockScheduleModel()))
    const account = await sut.add(mockScheduleModel())
    expect(account).toBeNull()
  })

  test('Should call LoadScheduleByNameRepository with correct name', async () => {
    const { sut, loadScheduleByNameRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadScheduleByNameRepositoryStub, 'loadByName')
    await sut.add(mockAddScheduleParams())
    expect(loadSpy).toHaveBeenCalledWith('any_name')
  })
})
