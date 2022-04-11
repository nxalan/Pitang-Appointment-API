import { AddAppointmentRepository, LoadAppointmentByNameRepository } from '.'
import { DbAddAppointment } from './db-add-appointment'
import { mockAddAppointmentParams, mockAppointmentModel, throwError } from '@/domain/test'
import { mockAddAppointmentRepository, mockLoadAppointmentByNameRepository } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddAppointment
  addAppointmentRepositoryStub: AddAppointmentRepository
  loadAppointmentByNameRepositoryStub: LoadAppointmentByNameRepository
}

const makeSut = (): SutTypes => {
  const addAppointmentRepositoryStub = mockAddAppointmentRepository()
  const loadAppointmentByNameRepositoryStub = mockLoadAppointmentByNameRepository()
  jest.spyOn(loadAppointmentByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null as any))
  const sut = new DbAddAppointment(addAppointmentRepositoryStub, loadAppointmentByNameRepositoryStub)
  return {
    sut,
    addAppointmentRepositoryStub,
    loadAppointmentByNameRepositoryStub
  }
}

describe('DbAddAppointment Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call AddAppointmentRepository with correct values', async () => {
    const { sut, addAppointmentRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAppointmentRepositoryStub, 'add')
    await sut.add(mockAddAppointmentParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      appointmentdDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      status: 'NOT VACCINED',
      appointmentComments: ''
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

  test('Should return null if LoadAppointmentByNameRepository not return null', async () => {
    const { sut, loadAppointmentByNameRepositoryStub } = makeSut()
    jest.spyOn(loadAppointmentByNameRepositoryStub, 'loadByName').mockReturnValueOnce(Promise.resolve(mockAppointmentModel()))
    const appointment = await sut.add(mockAppointmentModel())
    expect(appointment).toBeNull()
  })

  test('Should call LoadAppointmentByNameRepository with correct name', async () => {
    const { sut, loadAppointmentByNameRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAppointmentByNameRepositoryStub, 'loadByName')
    await sut.add(mockAddAppointmentParams())
    expect(loadSpy).toHaveBeenCalledWith('any_name')
  })
})
