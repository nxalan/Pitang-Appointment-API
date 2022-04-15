
import { DbDeleteAppointment } from './db-delete-appointment'
import { DeleteAppointmentRepository } from '.'
import MockDate from 'mockdate'
import { mockAppointmentModel, throwError } from '@/domain/test'
import { mockDeleteAppointmentRepository } from '@/data/test'

type SutTypes = {
  sut: DbDeleteAppointment
  deleteAppointmentRepositoryStub: DeleteAppointmentRepository
}

const makeSut = (): SutTypes => {
  const deleteAppointmentRepositoryStub = mockDeleteAppointmentRepository()
  const sut = new DbDeleteAppointment(deleteAppointmentRepositoryStub)
  return {
    sut,
    deleteAppointmentRepositoryStub
  }
}

describe('DbDeleteAppointment', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call DeleteAppointmentRepository', async () => {
    const { sut, deleteAppointmentRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteAppointmentRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return a appointment on success', async () => {
    const { sut } = makeSut()
    const appointments = await sut.delete('any_id')
    expect(appointments).toEqual(mockAppointmentModel())
  })

  test('Should throw if DeleteAppointmentRepository throws', async () => {
    const { sut, deleteAppointmentRepositoryStub } = makeSut()
    jest.spyOn(deleteAppointmentRepositoryStub, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete('any_id')
    await expect(promise).rejects.toThrow()
  })
})
