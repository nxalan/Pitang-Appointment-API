import { LoadAppointmentByIdController } from './load-appointment-by-id-controller'
import { HttpRequest, LoadAppointmentById, Validation } from './load-appointment-by-id-controller-protocols'
import MockDate from 'mockdate'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockAppointmentModel, throwError } from '@/domain/test'
import { mockLoadAppointmentById, mockValidation } from '@/presentation/test'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: LoadAppointmentByIdController
  loadAppointmentByIdStub: LoadAppointmentById
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadAppointmentByIdStub = mockLoadAppointmentById()
  const validationStub = mockValidation()
  const sut = new LoadAppointmentByIdController(loadAppointmentByIdStub, validationStub)
  return {
    sut,
    loadAppointmentByIdStub,
    validationStub
  }
}

describe('DeleteAppointment Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadAppointmentById with correct values', async () => {
    const { sut, loadAppointmentByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAppointmentByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 403 if LoadAppointmentById returns null', async () => {
    const { sut, loadAppointmentByIdStub } = makeSut()
    jest.spyOn(loadAppointmentByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null as any))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })

  test('Should return 500 if LoadAppointmentById throws', async () => {
    const { sut, loadAppointmentByIdStub } = makeSut()
    jest.spyOn(loadAppointmentByIdStub, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockAppointmentModel()))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validatespy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validatespy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any field')))
    const httpRequest = await sut.handle(mockRequest())
    expect(httpRequest).toEqual(badRequest(new MissingParamError('any field')))
  })
})
