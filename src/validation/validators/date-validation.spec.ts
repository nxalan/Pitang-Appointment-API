import { DateValidation } from './date-validation'
import { DateValidator } from '@/validation/protocols/date-validator'
import { InvalidParamError } from '@/presentation/errors'
import { mockDateValidator } from '@/validation/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DateValidation
  dateValidatorStub: DateValidator
}

const makeSut = (): SutTypes => {
  const dateValidatorStub = mockDateValidator()
  const sut = new DateValidation('date', dateValidatorStub)
  return {
    sut,
    dateValidatorStub
  }
}

describe('Date Validation', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return an error if DateValidator returns false', () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ date: new Date() })
    expect(error).toEqual(new InvalidParamError('date'))
  })

  test('Should call DateValidator with correct date', () => {
    const { sut, dateValidatorStub } = makeSut()
    const actualDate = new Date()
    const isValidSpy = jest.spyOn(dateValidatorStub, 'isValid')
    sut.validate({ date: actualDate })
    expect(isValidSpy).toHaveBeenCalledWith(new Date())
  })

  test('Should throw if DateValidator throws', () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
