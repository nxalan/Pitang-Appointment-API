import { IdValidation } from './id-validation'
import { InvalidParamError } from '@/presentation/errors'
import { ObjectId } from 'mongodb'

type SutTypes = {
  sut: IdValidation
}

const makeSut = (): SutTypes => {
  const sut = new IdValidation('id')
  return {
    sut
  }
}

describe('Date Validation', () => {
  test('Should return an error if id is invalid', async () => {
    const { sut } = makeSut()
    const response = await sut.validate({ id: 'invalid-id' })
    expect(response).toEqual(new InvalidParamError('id'))
  })

  test('Should return if id is a valid id', async () => {
    const { sut } = makeSut()
    const response = await sut.validate({ id: new ObjectId().toString() })
    expect(response).toBeFalsy()
  })
})
