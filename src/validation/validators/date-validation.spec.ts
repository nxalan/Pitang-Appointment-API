import { DateValidation } from './date-validation'
import { InvalidParamError } from '@/presentation/errors'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DateValidation
}

const makeSut = (): SutTypes => {
  const sut = new DateValidation('date')
  return {
    sut
  }
}

describe('Date Validation', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should return if date is not defined', async () => {
    const { sut } = makeSut()
    const response = await sut.validate({ date: undefined })
    expect(response).toBeFalsy()
  })

  test('Should return an error if DateValidator returns false', async () => {
    const { sut } = makeSut()
    const response = await sut.validate({ date: 'invalid data' })
    expect(response).toEqual(new InvalidParamError('date'))
  })

  test('Should return if date is a valid day', async () => {
    const { sut } = makeSut()
    const response = await sut.validate({ date: new Date() })
    expect(response).toBeFalsy()
  })
})
