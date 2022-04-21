import { DeleteAppointmentController } from './delete-appointment-controller'
import { HttpRequest, DeleteAppointment, LoadAppointmentById, Validation } from '.'
import MockDate from 'mockdate'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockAppointmentModel, throwError } from '@/domain/test'
import { mockLoadAppointmentById, mockDeleteAppointment, mockValidation } from '@/presentation/test'
import { InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors'

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: DeleteAppointmentController
  loadAppointmentByIdStub: LoadAppointmentById
  validationStub: Validation
  deleteAppointmentStub: DeleteAppointment
}

const makeSut = (): SutTypes => {
  const deleteAppointmentStub = mockDeleteAppointment()
  const validationStub = mockValidation()
  const loadAppointmentByIdStub = mockLoadAppointmentById()
  const sut = new DeleteAppointmentController(deleteAppointmentStub, validationStub, loadAppointmentByIdStub)
  return {
    sut,
    deleteAppointmentStub,
    validationStub,
    loadAppointmentByIdStub
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

  test('Should return 500 if DeleteAppointment throws', async () => {
    const { sut, deleteAppointmentStub } = makeSut()
    jest.spyOn(deleteAppointmentStub, 'delete').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
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
    expect(validatespy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any field')))
    const httpRequest = await sut.handle(mockRequest())
    expect(httpRequest).toEqual(badRequest(new MissingParamError('any field')))
  })
})
