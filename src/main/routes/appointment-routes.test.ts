import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import app from '@/main/config/app'
import { mockListOfEditAppointmentParams } from '@/domain/test'

let appointmentCollection: Collection

const mockAppointment = (): any => {
  const appointment = {
    name: 'any_name',
    birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
    appointment_date: new Date(new Date().setDate(new Date().getDate() + 1))
  }
  return appointment
}

describe('Appointment Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    appointmentCollection = await MongoHelper.getCollection('appointments')
    await appointmentCollection.deleteMany({})
  })

  describe('POST /appointment', () => {
    test('Should return 200 on add-appointment', async () => {
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      expect(storedAppointment.statusCode).toBe(200)
    })

    test('Should return 200 on edit-appointment with a valid id', async () => {
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      const { id } = storedAppointment.body
      const modifiedAppointment = {
        name: 'modified_name',
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
        appointment_date: new Date(new Date().setDate(new Date().getDate() + 1)),
        status: 'modified_status',
        status_comment: 'modified_status_comment'
      }
      const response = await request(app).put(`/api/appointment/${id}`).send(modifiedAppointment)
      expect(response.statusCode).toBe(200)
    })

    test('Should return 200 on edit-appointment with only status and status_comment on the request body', async () => {
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      const { id } = storedAppointment.body
      const modifiedAppointment = {
        status: 'modified_status',
        status_comment: 'modified_status_comment'
      }
      const response = await request(app).put(`/api/appointment/${id}`).send(modifiedAppointment)
      expect(response.statusCode).toBe(200)
    })

    test('Should return 200 on edit-appointment with request with no body', async () => {
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      const { id } = storedAppointment.body
      const response = await request(app).put(`/api/appointment/${id}`).send()
      expect(response.statusCode).toBe(200)
    })

    test('Should return 400 on create-appointment if selected appointment_date day is full', async () => {
      await appointmentCollection.insertMany(mockListOfEditAppointmentParams(20))
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      expect(storedAppointment.statusCode).toBe(400)
    })

    test('Should return 200 on create-appointment if selected appointment_date day is not full', async () => {
      await appointmentCollection.insertMany(mockListOfEditAppointmentParams(19))
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      expect(storedAppointment.statusCode).toBe(200)
    })
  })
})
