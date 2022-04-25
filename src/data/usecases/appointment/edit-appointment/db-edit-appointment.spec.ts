import { EditAppointmentRepository, LoadAppointmentsByDayRepository, LoadAppointmentsByHourRepository } from '.'
import { DbEditAppointment } from './db-edit-appointment'
import { mockEditAppointmentParams, mockAppointmentModel, throwError, mockListOfEditAppointmentParamsWithSameHours, mockListOfEditAppointmentParamsWithDifferentHours } from '@/domain/test'
import { mockEditAppointmentRepository, mockLoadAppointmentsByDayRepository, mockLoadAppointmentsByHourRepository } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbEditAppointment
  editAppointmentRepositoryStub: EditAppointmentRepository
  loadAppointmentsByDayStub: LoadAppointmentsByDayRepository
  loadAppointmentsByHourStub: LoadAppointmentsByHourRepository
}

const makeSut = (): SutTypes => {
  const editAppointmentRepositoryStub = mockEditAppointmentRepository()
  const loadAppointmentsByDayStub = mockLoadAppointmentsByDayRepository()
  const loadAppointmentsByHourStub = mockLoadAppointmentsByHourRepository()
  const sut = new DbEditAppointment(editAppointmentRepositoryStub, loadAppointmentsByDayStub, loadAppointmentsByHourStub)
  return {
    sut,
    editAppointmentRepositoryStub,
    loadAppointmentsByDayStub,
    loadAppointmentsByHourStub
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
      id: 'any_id',
      name: 'any_name',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)).toISOString(),
      appointment_date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
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

  test('Should call editAppointmentRepositoryStub with birthday and appointment_date on ISOString format', async () => {
    const { sut, editAppointmentRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(editAppointmentRepositoryStub, 'edit')
    const requestWithoutISOString = {
      id: 'any_id',
      name: 'any_name',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)) as unknown as string,
      appointment_date: new Date(new Date().setDate(new Date().getDate() + 1)) as unknown as string,
      status: 'NOT VACCINED',
      status_comment: ''
    }
    await sut.edit(requestWithoutISOString)
    expect(addSpy).toHaveBeenCalledWith(mockAppointmentModel())
  })

  test('Should throw if LoadAppointmentsByDayRepository throws', async () => {
    const { sut, loadAppointmentsByDayStub } = makeSut()
    jest.spyOn(loadAppointmentsByDayStub, 'loadByDay').mockImplementationOnce(throwError)
    const promise = sut.edit(mockEditAppointmentParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadAppointmentsByHourRepository throws', async () => {
    const { sut, loadAppointmentsByHourStub } = makeSut()
    jest.spyOn(loadAppointmentsByHourStub, 'loadByHour').mockImplementationOnce(throwError)
    const promise = sut.edit(mockEditAppointmentParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if appointment_date day is not available', async () => {
    const { sut, loadAppointmentsByDayStub } = makeSut()
    jest.spyOn(loadAppointmentsByDayStub, 'loadByDay').mockReturnValueOnce(Promise.resolve(mockListOfEditAppointmentParamsWithDifferentHours(20)))
    const promise = sut.edit(mockEditAppointmentParams())
    await expect(promise).resolves.toThrow()
  })

  test('Should throw if appointment_date hour is not available', async () => {
    const { sut, loadAppointmentsByHourStub } = makeSut()
    jest.spyOn(loadAppointmentsByHourStub, 'loadByHour').mockReturnValueOnce(Promise.resolve(mockListOfEditAppointmentParamsWithSameHours(2)))
    const promise = sut.edit(mockEditAppointmentParams())
    await expect(promise).resolves.toThrow()
  })
})
