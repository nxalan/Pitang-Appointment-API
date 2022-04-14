import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { AppointmentMongoRepository } from './appointment-mongo-repository'
import { mockAddAppointmentParams, mockEditAppointmentParams, mockListOfEditAppointmentParamsWithDifferentHours, mockListOfEditAppointmentParamsWithSameHours } from '@/domain/test'
import MockDate from 'mockdate'

let appointmentCollection: Collection

describe('Appointment Mongo Repository', () => {
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

  const makeSut = (): AppointmentMongoRepository => {
    return new AppointmentMongoRepository()
  }

  describe('Add', () => {
    test('Should return an appointment on add success', async () => {
      const sut = makeSut()
      const appointment = await sut.add(mockAddAppointmentParams())
      expect(appointment).toBeTruthy()
      expect(appointment.id).toBeTruthy()
      expect(appointment.name).toBe('any_name')
      expect(appointment.birthday).toEqual(new Date(new Date().setFullYear(new Date().getFullYear() - 20)).toISOString())
      expect(appointment.appointment_date).toEqual(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString())
    })

    describe('Edit', () => {
      test('Should return an appointment on edit success', async () => {
        const sut = makeSut()
        const storedAppointment = await sut.add(mockAddAppointmentParams())
        const mockedEditAppointmentParamsWithValidId = { ...mockEditAppointmentParams(), id: storedAppointment.id }
        const editedAppointment = await sut.edit(mockedEditAppointmentParamsWithValidId)
        expect(editedAppointment).toBeTruthy()
        expect(editedAppointment.id).toBeTruthy()
        expect(editedAppointment.name).toBe('any_name')
        expect(editedAppointment.birthday).toEqual(new Date(new Date().setFullYear(new Date().getFullYear() - 20)).toISOString())
        expect(editedAppointment.appointment_date).toEqual(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString())
        expect(editedAppointment.status).toBe('any_status')
        expect(editedAppointment.status_comment).toBe('any_status_comment')
      })

      test('Should return an appointment on edit success with an empty body', async () => {
        const sut = makeSut()
        const storedAppointment = await sut.add(mockAddAppointmentParams())
        const editedAppointment = await sut.edit({ id: storedAppointment.id })
        expect(editedAppointment).toBeTruthy()
        expect(editedAppointment.id).toBeTruthy()
        expect(editedAppointment.name).toBe('any_name')
        expect(editedAppointment.birthday).toEqual(new Date(new Date().setFullYear(new Date().getFullYear() - 20)).toISOString())
        expect(editedAppointment.appointment_date).toEqual(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString())
      })
    })

    describe('LoadByName', () => {
      test('Should return an appointment on loadByName success', async () => {
        const sut = makeSut()
        await appointmentCollection.insertOne(mockAddAppointmentParams())
        const appointment = await sut.loadByName('any_name')
        expect(appointment).toBeTruthy()
        expect(appointment.id).toBeTruthy()
        expect(appointment.name).toBe('any_name')
        expect(appointment.birthday).toEqual(new Date(new Date().setFullYear(new Date().getFullYear() - 20)).toISOString())
        expect(appointment.appointment_date).toEqual(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString())
      })

      test('Should return null if loadByName fails', async () => {
        const sut = makeSut()
        const appointment = await sut.loadByName('any_name')
        expect(appointment).toBeFalsy()
      })
    })
    describe('LoadById', () => {
      test('Should return an appointment on loadById success', async () => {
        const res = await appointmentCollection.insertOne(mockAddAppointmentParams())
        const sut = makeSut()
        const appointment = await sut.loadById(res.ops[0]._id)
        expect(appointment).toBeTruthy()
        expect(appointment.id).toBeTruthy()
      })
    })
    describe('loadAppointmentsByDay', () => {
      test('Should return an list of appointment with the same appointment_date day on success', async () => {
        await appointmentCollection.insertMany(mockListOfEditAppointmentParamsWithDifferentHours(20))
        const sut = makeSut()
        const appointment = await sut.loadByDay(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString())
        expect(appointment.length).toBe(20)
      })

      test('Should return an empty list if there is no matching day', async () => {
        const sut = makeSut()
        const appointment = await sut.loadByDay(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString())
        expect(appointment.length).toBe(0)
      })
    })
    describe('loadAppointmentsByHour', () => {
      test('Should return an list of appointment with the same appointment_date hour on success', async () => {
        await appointmentCollection.insertMany(mockListOfEditAppointmentParamsWithSameHours(2))
        const sut = makeSut()
        const appointment = await sut.loadByHour(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString())
        expect(appointment.length).toBe(2)
      })

      test('Should return an empty list if there is no matching hour', async () => {
        const sut = makeSut()
        const appointment = await sut.loadByHour(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString())
        expect(appointment.length).toBe(0)
      })
    })
  })
})
