import { LoadRestrictedDatesRepository } from './db-load-restricted-dates-protocols'
import { DbLoadRestrictedDates } from './db-load-restricted-dates'
import MockDate from 'mockdate'
import { mockRestrictedDatesModel, throwError } from '@/domain/test'
import { mockLoadRestrictedDatesRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadRestrictedDates
  loadRestrictedDatesRepositoryStub: LoadRestrictedDatesRepository
}

const makeSut = (): SutTypes => {
  const loadRestrictedDatesRepositoryStub = mockLoadRestrictedDatesRepository()
  const sut = new DbLoadRestrictedDates(loadRestrictedDatesRepositoryStub)
  return {
    sut,
    loadRestrictedDatesRepositoryStub
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
    const { sut, loadRestrictedDatesRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadRestrictedDatesRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return the restricted dates on success', async () => {
    const { sut } = makeSut()
    const restrictedDates = await sut.load()
    expect(restrictedDates).toEqual(mockRestrictedDatesModel())
  })

  test('Should throw if LoadRestrictedDatesRepository throws', async () => {
    const { sut, loadRestrictedDatesRepositoryStub } = makeSut()
    jest.spyOn(loadRestrictedDatesRepositoryStub, 'load').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
