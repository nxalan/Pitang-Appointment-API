import { DayHourValidation } from './day-hour-validation'
import { DayHourValidator } from '@/validation/protocols/day-hour-validator'
import { InvalidParamError } from '@/presentation/errors'
import { mockDayHourValidator } from '@/validation/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DayHourValidation
  dayHourValidatorStub: DayHourValidator
}

const makeSut = (): SutTypes => {
  const dayHourValidatorStub = mockDayHourValidator()
  const sut = new DayHourValidation('date', dayHourValidatorStub)
  return {
    sut,
    dayHourValidatorStub
  }
}

describe('Day Hour Validation', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return an error if DayHourValidator returns false', () => {
    const { sut, dayHourValidatorStub } = makeSut()
    jest.spyOn(dayHourValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ date: new Date() })
    expect(error).toEqual(new InvalidParamError('date'))
  })

  test('Should call DayHourValidator with correct date', () => {
    const { sut, dayHourValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(dayHourValidatorStub, 'isValid')
    sut.validate({ date: new Date() })
    expect(isValidSpy).toHaveBeenCalledWith(new Date())
  })

  test('Should throw if DayHourValidator throws', () => {
    const { sut, dayHourValidatorStub } = makeSut()
    jest.spyOn(dayHourValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
