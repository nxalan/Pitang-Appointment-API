import { HourValidation } from './hour-validation'
import { LoadAppointmentsByHour } from '@/domain/usecases/appointment'
import { InvalidParamError } from '@/presentation/errors'
import { mockLoadAppointmentsByHour } from '@/validation/test'
import MockDate from 'mockdate'
import { mockListOfEditAppointmentParamsWithSameHours } from '@/domain/test'

type SutTypes = {
  sut: HourValidation
  loadAppointmentsByHourStub: LoadAppointmentsByHour
}

const makeSut = (): SutTypes => {
  const loadAppointmentsByHourStub = mockLoadAppointmentsByHour()
  const sut = new HourValidation('appointment_date', loadAppointmentsByHourStub)
  return {
    sut,
    loadAppointmentsByHourStub
  }
}

describe('Hour Validation', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should mockLoadAppointmentsByHour return the correct values', async () => {
    const { loadAppointmentsByHourStub } = makeSut()
    const mockLoadAppointmentsByHour = await loadAppointmentsByHourStub.loadByHour(null as any)
    expect(mockLoadAppointmentsByHour.length).toEqual(2)
    expect(mockLoadAppointmentsByHour[0].name).toBeTruthy()
    expect(mockLoadAppointmentsByHour[1].name).toBeTruthy()
  })

  test('Should return if date is not defined', async () => {
    const { sut } = makeSut()
    const response = await sut.validate({ appointment_date: undefined })
    expect(response).toBeFalsy()
  })

  test('Should return an error if HourValidator returns false', async () => {
    const { sut, loadAppointmentsByHourStub } = makeSut()
    jest.spyOn(loadAppointmentsByHourStub, 'loadByHour').mockReturnValueOnce(Promise.resolve(mockListOfEditAppointmentParamsWithSameHours(2)))
    const response = await sut.validate({ appointment_date: new Date(new Date().setDate(new Date().getDate() + 1)) })
    expect(response).toEqual(new InvalidParamError('appointment_date hour, the chosen hour is already full'))
  })

  test('Should return if date is a valid hour', async () => {
    const { sut, loadAppointmentsByHourStub } = makeSut()
    jest.spyOn(loadAppointmentsByHourStub, 'loadByHour').mockReturnValueOnce(Promise.resolve(mockListOfEditAppointmentParamsWithSameHours(1)))
    const response = await sut.validate({ appointment_date: new Date(new Date().setDate(new Date().getDate() + 1)) })
    expect(response).toBeFalsy()
  })
})
