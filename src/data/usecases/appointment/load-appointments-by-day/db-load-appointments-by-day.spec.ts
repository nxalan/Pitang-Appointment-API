
import { DbLoadAppointmentsByDay } from './db-load-appointments-by-day'
import { LoadAppointmentsByDayRepository } from '.'
import MockDate from 'mockdate'
import { throwError } from '@/domain/test'
import { mockLoadAppointmentsByDayRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadAppointmentsByDay
  loadAppointmentsByDayRepositoryStub: LoadAppointmentsByDayRepository
}

const makeSut = (): SutTypes => {
  const loadAppointmentsByDayRepositoryStub = mockLoadAppointmentsByDayRepository()
  const sut = new DbLoadAppointmentsByDay(loadAppointmentsByDayRepositoryStub)
  return {
    sut,
    loadAppointmentsByDayRepositoryStub
  }
}

describe('DbLoadAppointmentsByDay', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadAppointmentsByDayRepository', async () => {
    const { sut, loadAppointmentsByDayRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAppointmentsByDayRepositoryStub, 'loadByDay')
    const actualDate = new Date().toISOString()
    await sut.loadByDay(actualDate)
    expect(loadByIdSpy).toHaveBeenCalledWith(actualDate)
  })

  test('Should return a list of appointment on success', async () => {
    const { sut } = makeSut()
    const appointments = await sut.loadByDay(new Date().toISOString())
    expect(appointments.length).toEqual(19)
  })

  test('Should throw if LoadAppointmentByIdRepository throws', async () => {
    const { sut, loadAppointmentsByDayRepositoryStub } = makeSut()
    jest.spyOn(loadAppointmentsByDayRepositoryStub, 'loadByDay').mockImplementationOnce(throwError)
    const promise = sut.loadByDay(new Date().toISOString())
    await expect(promise).rejects.toThrow()
  })
})
