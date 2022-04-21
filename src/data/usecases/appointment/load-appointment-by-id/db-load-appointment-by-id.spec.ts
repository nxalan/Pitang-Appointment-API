
import { DbLoadAppointmentById } from './db-load-appointment-by-id'
import { LoadAppointmentByIdRepository } from '.'
import MockDate from 'mockdate'
import { mockAppointmentModel, throwError } from '@/domain/test'
import { mockLoadAppointmentByIdRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadAppointmentById
  loadAppointmentByIdRepositoryStub: LoadAppointmentByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAppointmentByIdRepositoryStub = mockLoadAppointmentByIdRepository()
  const sut = new DbLoadAppointmentById(loadAppointmentByIdRepositoryStub)
  return {
    sut,
    loadAppointmentByIdRepositoryStub
  }
}

describe('DbLoadAppointmentById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadAppointmentByIdRepository', async () => {
    const { sut, loadAppointmentByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAppointmentByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return a appointment on success', async () => {
    const { sut } = makeSut()
    const appointments = await sut.loadById('any_id')
    expect(appointments).toEqual(mockAppointmentModel())
  })

  test('Should throw if LoadAppointmentByIdRepository throws', async () => {
    const { sut, loadAppointmentByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAppointmentByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
