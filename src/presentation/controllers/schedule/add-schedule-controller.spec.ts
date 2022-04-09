import { HttpRequest, AddSchedule } from './add-schedule-controller-protocols'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddScheduleController } from './add-schedule-controller'
import { mockAddSchedule } from '@/presentation/test'
import { ServerError } from '@/presentation/errors'
import { mockScheduleModel } from '@/domain/test'
import MockDate from 'mockdate'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
    scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1))
  }
})

type SutTypes = {
  sut: AddScheduleController
  addScheduleStub: AddSchedule
}

const makeSut = (): SutTypes => {
  const addScheduleStub = mockAddSchedule()
  const sut = new AddScheduleController(addScheduleStub)
  return {
    sut,
    addScheduleStub
  }
}

describe('AddSchedule Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddSchedule with correct values', async () => {
    const { sut, addScheduleStub } = makeSut()
    const addSpy = jest.spyOn(addScheduleStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1))
    })
  })

  test('Should return 500 if AddSchedule throws', async () => {
    const { sut, addScheduleStub } = makeSut()
    jest.spyOn(addScheduleStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockScheduleModel()))
  })
})
