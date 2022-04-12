import { HttpRequest, AddAppointment, Validation, LoadAppointmentById } from '.'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddAppointmentController } from './add-appointment-controller'
import { mockAddAppointment, mockValidation, mockLoadAppointmentById } from '@/presentation/test'
import { InvalidParamError, MissingParamError, NameInUseError, ServerError } from '@/presentation/errors'
import { mockAppointmentModel, throwError } from '@/domain/test'
import MockDate from 'mockdate'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
    appointment_date: new Date(new Date().setDate(new Date().getDate() + 1))
  }
})

const mockRequestWithId = (): HttpRequest => ({
  body: {
    name: 'any_name',
    birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
    appointment_date: new Date(new Date().setDate(new Date().getDate() + 1))
  },
  params: {
    appointment_id: 'any_appointment_id'
  }
})

type SutTypes = {
  sut: AddAppointmentController
  addAppointmentStub: AddAppointment
  loadAppointmentByIdStub: LoadAppointmentById
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAppointmentStub = mockAddAppointment()
  const loadAppointmentByIdStub = mockLoadAppointmentById()
  const validationStub = mockValidation()
  const sut = new AddAppointmentController(
    addAppointmentStub,
    loadAppointmentByIdStub,
    validationStub
  )
  return {
    sut,
    addAppointmentStub,
    loadAppointmentByIdStub,
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

  test('Should call LoadAppointmentById with correct values', async () => {
    const { sut, loadAppointmentByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAppointmentByIdStub, 'loadById')
    await sut.handle(mockRequestWithId())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_appointment_id')
  })

  test('Should return 403 if LoadAppointmentById returns null', async () => {
    const { sut, loadAppointmentByIdStub } = makeSut()
    jest.spyOn(loadAppointmentByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null as any))
    const httpResponse = await sut.handle(mockRequestWithId())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('appointment_id')))
  })

  test('Should return 500 if LoadAppointmentById throws', async () => {
    const { sut, loadAppointmentByIdStub } = makeSut()
    jest.spyOn(loadAppointmentByIdStub, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequestWithId())
    expect(httpResponse).toEqual(serverError(new Error()))
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
    expect(httpResponse).toEqual(ok(mockAppointmentModel()))
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
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any field'))
    const httpRequest = await sut.handle(mockRequest())
    expect(httpRequest).toEqual(badRequest(new MissingParamError('any field')))
  })

  test('Should return 403 if AddAppointment returns null', async () => {
    const { sut, addAppointmentStub } = makeSut()
    jest.spyOn(addAppointmentStub, 'add').mockReturnValueOnce(Promise.resolve(null as any))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new NameInUseError()))
  })
})
