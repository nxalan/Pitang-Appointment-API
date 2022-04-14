import { LoadAppointmentsRepository } from './db-load-appointments-protocols'
import { DbLoadAppointments } from './db-load-appointments'
import MockDate from 'mockdate'
import { mockAppointmentModels, mockListOfEditAppointmentParamsWithDifferentHours, throwError } from '@/domain/test'
import { mockLoadAppointmentsRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadAppointments
  loadAppointmentsRepositoryStub: LoadAppointmentsRepository
}

const makeSut = (): SutTypes => {
  const loadAppointmentsRepositoryStub = mockLoadAppointmentsRepository()
  const sut = new DbLoadAppointments(loadAppointmentsRepositoryStub)
  return {
    sut,
    loadAppointmentsRepositoryStub
  }
}

describe('DbLoadAppointments', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadAppointmentsRepository', async () => {
    const { sut, loadAppointmentsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadAppointmentsRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Appointments on success', async () => {
    const { sut } = makeSut()
    const appointments = await sut.load()
    expect(appointments).toEqual(mockAppointmentModels())
  })

  test('Should throw if LoadAppointmentsRepository throws', async () => {
    const { sut, loadAppointmentsRepositoryStub } = makeSut()
    jest.spyOn(loadAppointmentsRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
