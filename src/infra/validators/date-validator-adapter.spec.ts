import { DateValidatorAdapter } from './date-validator-adapter'
import MockDate from 'mockdate'
import validator from 'validator'

jest.mock('validator', () => ({
  isDate (): boolean {
    return true
  }
}))

const makeSut = (): DateValidatorAdapter => {
  return new DateValidatorAdapter()
}

describe('DateValidator Adapter', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isDate').mockReturnValueOnce(false)
    const isValid = sut.isValid(new Date())
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(new Date())
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct date', () => {
    const sut = makeSut()
    const isDateSpy = jest.spyOn(validator, 'isDate')
    sut.isValid(new Date())
    expect(isDateSpy).toHaveBeenCalledWith(new Date().toString())
  })
})
