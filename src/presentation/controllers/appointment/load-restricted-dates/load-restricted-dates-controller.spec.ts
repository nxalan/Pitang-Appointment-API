import { LoadRestrictedDatesController } from './load-restricted-dates-controller'
import { LoadRestrictedDates } from './load-restricted-dates-controller-protocols'
import MockDate from 'mockdate'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockRestrictedDatesModel, throwError } from '@/domain/test'
import { mockLoadRestrictedDates } from '@/presentation/test'

type SutTypes = {
  sut: LoadRestrictedDatesController
  loadRestrictedDatesStub: LoadRestrictedDates
}

const makeSut = (): SutTypes => {
  const loadRestrictedDatesStub = mockLoadRestrictedDates()
  const sut = new LoadRestrictedDatesController(loadRestrictedDatesStub)
  return {
    sut,
    loadRestrictedDatesStub
  }
}

describe('LoadRestrictedDates Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadRestrictedDates', async () => {
    const { sut, loadRestrictedDatesStub } = makeSut()
    const loadSpy = jest.spyOn(loadRestrictedDatesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse).toEqual(ok(mockRestrictedDatesModel()))
  })

  test('Should return 200 if LoadRestrictedDates returns empty', async () => {
    const { sut, loadRestrictedDatesStub } = makeSut()
    jest.spyOn(loadRestrictedDatesStub, 'load').mockReturnValueOnce(Promise.resolve({ restrictedDays: [], restrictedHours: [] }))
    const httpResponse = await sut.handle({})
    expect(httpResponse.body).toEqual({ restrictedDays: [], restrictedHours: [] })
    expect(httpResponse.statusCode).toEqual(200)
  })

  test('Should return 500 if LoadRestrictedDates throws', async () => {
    const { sut, loadRestrictedDatesStub } = makeSut()
    jest.spyOn(loadRestrictedDatesStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
