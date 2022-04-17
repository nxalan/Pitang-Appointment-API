import { LoadAppointmentsController } from './load-appointments-controller'
import { LoadAppointments } from '.'
import MockDate from 'mockdate'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockAppointmentModels, throwError } from '@/domain/test'
import { mockLoadAppointments } from '@/presentation/test'

type SutTypes = {
  sut: LoadAppointmentsController
  loadAppointmentsStub: LoadAppointments
}

const makeSut = (): SutTypes => {
  const loadAppointmentsStub = mockLoadAppointments()
  const sut = new LoadAppointmentsController(loadAppointmentsStub)
  return {
    sut,
    loadAppointmentsStub
  }
}

describe('LoadAppointments Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadAppointments', async () => {
    const { sut, loadAppointmentsStub } = makeSut()
    const loadSpy = jest.spyOn(loadAppointmentsStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse).toEqual(ok(mockAppointmentModels()))
  })

  test('Should return 200 if LoadAppointments returns empty', async () => {
    const { sut, loadAppointmentsStub } = makeSut()
    jest.spyOn(loadAppointmentsStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle({})
    expect(httpResponse.body).toEqual([])
    expect(httpResponse.statusCode).toEqual(200)
  })

  test('Should return 500 if LoadAppointments throws', async () => {
    const { sut, loadAppointmentsStub } = makeSut()
    jest.spyOn(loadAppointmentsStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
