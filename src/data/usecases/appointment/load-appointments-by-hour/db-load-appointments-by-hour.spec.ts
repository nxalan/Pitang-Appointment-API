
import { DbLoadAppointmentsByHour } from './db-load-appointments-by-hour'
import { LoadAppointmentsByHourRepository } from '.'
import MockDate from 'mockdate'
import { throwError } from '@/domain/test'
import { mockLoadAppointmentsByHourRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadAppointmentsByHour
  loadAppointmentsByHourRepositoryStub: LoadAppointmentsByHourRepository
}

const makeSut = (): SutTypes => {
  const loadAppointmentsByHourRepositoryStub = mockLoadAppointmentsByHourRepository()
  const sut = new DbLoadAppointmentsByHour(loadAppointmentsByHourRepositoryStub)
  return {
    sut,
    loadAppointmentsByHourRepositoryStub
  }
}

describe('DbLoadAppointmentsByHour', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadAppointmentsByHourRepository', async () => {
    const { sut, loadAppointmentsByHourRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAppointmentsByHourRepositoryStub, 'loadByHour')
    const actualDate = new Date().toISOString()
    await sut.loadByHour(actualDate)
    expect(loadByIdSpy).toHaveBeenCalledWith(actualDate)
  })

  test('Should return a list of appointment on success', async () => {
    const { sut } = makeSut()
    const appointments = await sut.loadByHour(new Date().toISOString())
    expect(appointments.length).toEqual(1)
  })

  test('Should throw if LoadAppointmentByIdRepository throws', async () => {
    const { sut, loadAppointmentsByHourRepositoryStub } = makeSut()
    jest.spyOn(loadAppointmentsByHourRepositoryStub, 'loadByHour').mockImplementationOnce(throwError)
    const promise = sut.loadByHour(new Date().toISOString())
    await expect(promise).rejects.toThrow()
  })
})
