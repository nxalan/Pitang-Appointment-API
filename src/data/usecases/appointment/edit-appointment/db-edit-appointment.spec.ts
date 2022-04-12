import { EditAppointmentRepository } from '.'
import { DbEditAppointment } from './db-edit-appointment'
import { mockEditAppointmentParams, mockAppointmentModel, throwError } from '@/domain/test'
import { mockEditAppointmentRepository, mockLoadAppointmentByNameRepository } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbEditAppointment
  editAppointmentRepositoryStub: EditAppointmentRepository
}

const makeSut = (): SutTypes => {
  const editAppointmentRepositoryStub = mockEditAppointmentRepository()
  const loadAppointmentByNameRepositoryStub = mockLoadAppointmentByNameRepository()
  jest.spyOn(loadAppointmentByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null as any))
  const sut = new DbEditAppointment(editAppointmentRepositoryStub)
  return {
    sut,
    editAppointmentRepositoryStub
  }
}

describe('DbEditAppointment Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call EditAppointmentRepository with correct values when a valid id is provided', async () => {
    const { sut, editAppointmentRepositoryStub } = makeSut()
    const EditSpy = jest.spyOn(editAppointmentRepositoryStub, 'edit')
    await sut.edit(mockEditAppointmentParams())
    expect(EditSpy).toHaveBeenCalledWith({
      appointment_id: 'any_id',
      name: 'any_name',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      appointment_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      status: 'any_status',
      status_comment: 'any_status_comment'
    })
  })

  test('Should throw if EditAppointmentRepository throws', async () => {
    const { sut, editAppointmentRepositoryStub } = makeSut()
    jest.spyOn(editAppointmentRepositoryStub, 'edit').mockImplementationOnce(throwError)
    const promise = sut.edit(mockEditAppointmentParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an appointment on success', async () => {
    const { sut } = makeSut()
    const appointment = await sut.edit(mockEditAppointmentParams())
    expect(appointment).toEqual(mockAppointmentModel())
  })
})
