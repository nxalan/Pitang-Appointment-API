import { LoadRestrictedDaysAndHoursRepository } from '.'
import { DbLoadRestrictedDates } from './db-load-restricted-dates'
import MockDate from 'mockdate'
import { mockRestrictedDatesModel, throwError } from '@/domain/test'
import { mockLoadRestrictedDayRepository, mockLoadRestrictedHourRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadRestrictedDates
  loadRestrictedDaysRepositoryStub: LoadRestrictedDaysAndHoursRepository
  loadRestrictedHoursRepositoryStub: LoadRestrictedDaysAndHoursRepository
}

const makeSut = (): SutTypes => {
  const loadRestrictedDaysRepositoryStub = mockLoadRestrictedDayRepository()
  const loadRestrictedHoursRepositoryStub = mockLoadRestrictedHourRepository()
  const sut = new DbLoadRestrictedDates(loadRestrictedDaysRepositoryStub, loadRestrictedHoursRepositoryStub)
  return {
    sut,
    loadRestrictedDaysRepositoryStub,
    loadRestrictedHoursRepositoryStub
  }
}

describe('DbLoadRestrictedDates', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadRestrictedDatesRepository', async () => {
    const { sut, loadRestrictedDaysRepositoryStub, loadRestrictedHoursRepositoryStub } = makeSut()
    const loadDaySpy = jest.spyOn(loadRestrictedDaysRepositoryStub, 'load')
    const loadHourSpy = jest.spyOn(loadRestrictedHoursRepositoryStub, 'load')
    await sut.load()
    expect(loadDaySpy).toHaveBeenCalled()
    expect(loadHourSpy).toHaveBeenCalled()
  })

  test('Should return the restricted dates on success', async () => {
    const { sut } = makeSut()
    const restrictedDates = await sut.load()
    expect(restrictedDates).toEqual(mockRestrictedDatesModel())
  })

  test('Should throw if LoadRestrictedDaysRepositoryStub throws', async () => {
    const { sut, loadRestrictedDaysRepositoryStub } = makeSut()
    jest.spyOn(loadRestrictedDaysRepositoryStub, 'load').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadRestrictedDaysRepositoryStub throws', async () => {
    const { sut, loadRestrictedHoursRepositoryStub } = makeSut()
    jest.spyOn(loadRestrictedHoursRepositoryStub, 'load').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
