import { DayValidation } from './day-validation'
import { DayValidator } from '@/validation/protocols/day-validator'
import { InvalidParamError } from '@/presentation/errors'
import { mockDayValidator } from '@/validation/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DayValidation
  dayValidatorStub: DayValidator
}

const makeSut = (): SutTypes => {
  const dayValidatorStub = mockDayValidator()
  const sut = new DayValidation('date', dayValidatorStub)
  return {
    sut,
    dayValidatorStub
  }
}

describe('Day Hour Validation', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return an error if DayValidator returns false', async () => {
    const { sut, dayValidatorStub } = makeSut()
    jest.spyOn(dayValidatorStub, 'isValid').mockReturnValueOnce(Promise.resolve(false))
    const error = await sut.validate({ date: new Date() })
    expect(error).toEqual(new InvalidParamError('date'))
  })

  test('Should call DayValidator with correct date', async () => {
    const { sut, dayValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(dayValidatorStub, 'isValid')
    await sut.validate({ date: new Date() })
    expect(isValidSpy).toHaveBeenCalledWith(new Date())
  })
})
