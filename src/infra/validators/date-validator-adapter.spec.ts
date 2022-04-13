import { DateValidatorAdapter } from './date-validator-adapter'
import MockDate from 'mockdate'

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
  test('Should return false if validator returns false', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid(new Date('invalid_data'))
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid(new Date())
    expect(isValid).toBe(true)
  })

  test('Should return true if date is not provided', async () => {
    const sut = makeSut()
    const isValid = await sut.isValid(undefined as any)
    expect(isValid).toBe(true)
  })
})
