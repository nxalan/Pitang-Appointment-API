import { HttpRequest, AddAppointment, Validation } from '.'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddAppointmentController } from './add-appointment-controller'
import { mockAddAppointment, mockValidation } from '@/presentation/test'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { mockAppointmentResponseModel } from '@/domain/test'
import MockDate from 'mockdate'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
    appointment_date: new Date(new Date().setDate(new Date().getDate() + 1))
  }
})

type SutTypes = {
  sut: AddAppointmentController
  addAppointmentStub: AddAppointment
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAppointmentStub = mockAddAppointment()
  const validationStub = mockValidation()
  const sut = new AddAppointmentController(
    addAppointmentStub,
    validationStub
  )
  return {
    sut,
    addAppointmentStub,
    validationStub
  }
}

describe('Add Appointment Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Add Appointment with correct values', async () => {
    const { sut, addAppointmentStub } = makeSut()
    const addSpy = jest.spyOn(addAppointmentStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      appointment_date: new Date(new Date().setDate(new Date().getDate() + 1))
    })
  })

  test('Should return 500 if AddAppointment throws', async () => {
    const { sut, addAppointmentStub } = makeSut()
    jest.spyOn(addAppointmentStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockAppointmentResponseModel()))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validatespy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validatespy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any field')))
    const httpRequest = await sut.handle(mockRequest())
    expect(httpRequest).toEqual(badRequest(new MissingParamError('any field')))
  })
})
