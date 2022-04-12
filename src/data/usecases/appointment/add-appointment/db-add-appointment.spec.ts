import { AddAppointmentRepository } from '.'
import { DbAddAppointment } from './db-add-appointment'
import { mockAddAppointmentParams, mockAppointmentModel, throwError, mockAddAppointmentWithIdParams } from '@/domain/test'
import { mockAddAppointmentRepository, mockLoadAppointmentByNameRepository } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddAppointment
  addAppointmentRepositoryStub: AddAppointmentRepository
}

const makeSut = (): SutTypes => {
  const addAppointmentRepositoryStub = mockAddAppointmentRepository()
  const loadAppointmentByNameRepositoryStub = mockLoadAppointmentByNameRepository()
  jest.spyOn(loadAppointmentByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null as any))
  const sut = new DbAddAppointment(addAppointmentRepositoryStub)
  return {
    sut,
    addAppointmentRepositoryStub
  }
}

describe('DbAddAppointment Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call AddAppointmentRepository with correct values when id is not provided', async () => {
    const { sut, addAppointmentRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAppointmentRepositoryStub, 'add')
    await sut.add(mockAddAppointmentParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      appointment_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      status: 'NOT VACCINED',
      status_comment: ''
    })
  })

  test('Should call AddAppointmentRepository with correct values when id is provided', async () => {
    const { sut, addAppointmentRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAppointmentRepositoryStub, 'add')
    await sut.add(mockAddAppointmentWithIdParams())
    expect(addSpy).toHaveBeenCalledWith({
      appointment_id: 'any_id',
      name: 'any_name',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      appointment_date: new Date(new Date().setDate(new Date().getDate() + 1))
    })
  })

  test('Should throw if AddAppointmentRepository throws', async () => {
    const { sut, addAppointmentRepositoryStub } = makeSut()
    jest.spyOn(addAppointmentRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAppointmentParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an appointment on success', async () => {
    const { sut } = makeSut()
    const appointment = await sut.add(mockAddAppointmentParams())
    expect(appointment).toEqual(mockAppointmentModel())
  })
})
