import { DayValidatorAdapter } from './day-validator-adapter'
import MockDate from 'mockdate'
import { MongoHelper } from '../db/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { mockAddAppointmentParams } from '@/domain/test'
import { randomUUID } from 'crypto'

let appointmentCollection: Collection

const makeSut = (): DayValidatorAdapter => {
  return new DayValidatorAdapter()
}

describe('DayValidator Adapter', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    appointmentCollection = await MongoHelper.getCollection('appointments')
    await appointmentCollection.deleteMany({})
  })

  test('Should return false if there is 20 or more appointment in the same day', async () => {
    const sut = makeSut()
    let listOf20Appointments = new Array(20).fill(mockAddAppointmentParams())
    listOf20Appointments = listOf20Appointments.map((cb) => ({ ...cb, name: 'teste' }))
    listOf20Appointments.forEach((eachAppointment) => { eachAppointment.name = randomUUID().substring(0, 5) })
    await appointmentCollection.insertMany(listOf20Appointments)
    const isValid = await sut.isValid(new Date(new Date().setDate(new Date().getDate() + 1)))
    expect(isValid).toBe(false)
  })

  /*
  test('Should return true if day validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(new Date())
    expect(isValid).toBe(true)
  })

  test('Should return true if date is not provided', () => {
    const sut = makeSut()
    const isValid = sut.isValid(undefined as any)
    expect(isValid).toBe(true)
  })
  */
})
