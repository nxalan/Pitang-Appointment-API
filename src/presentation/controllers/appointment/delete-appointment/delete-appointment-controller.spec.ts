import { DeleteAppointmentController } from './delete-appointment-controller'
import { HttpRequest, DeleteAppointment, LoadAppointmentById } from './delete-appointment-controller-protocols'
import MockDate from 'mockdate'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockAppointmentModel, throwError } from '@/domain/test'
import { mockLoadAppointmentById, mockDeleteAppointment } from '@/presentation/test'
import { InvalidParamError, ServerError } from '@/presentation/errors'

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: DeleteAppointmentController
  loadAppointmentByIdStub: LoadAppointmentById
  deleteAppointmentStub: DeleteAppointment
}

const makeSut = (): SutTypes => {
  const deleteAppointmentStub = mockDeleteAppointment()
  const loadAppointmentByIdStub = mockLoadAppointmentById()
  const sut = new DeleteAppointmentController(deleteAppointmentStub, loadAppointmentByIdStub)
  return {
    sut,
    deleteAppointmentStub,
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
})
