import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import app from '@/main/config/app'
import { mockAppointmentModels, mockListOfEditAppointmentParamsWithDifferentHours, mockListOfEditAppointmentParamsWithSameHours } from '@/domain/test'

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
      expect(storedAppointment.body.id).toBeTruthy()
    })
    test('Should return 403 on create-appointment if selected appointment_date day is full', async () => {
      await appointmentCollection.insertMany(mockListOfEditAppointmentParamsWithDifferentHours(20))
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      expect(storedAppointment.statusCode).toBe(403)
    })

    test('Should return 200 on create-appointment if selected appointment_date day is not full', async () => {
      await appointmentCollection.insertMany(mockListOfEditAppointmentParamsWithDifferentHours(19))
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      expect(storedAppointment.statusCode).toBe(200)
    })

    test('Should return 403 on create-appointment if selected appointment_date hour is full', async () => {
      await appointmentCollection.insertMany(mockListOfEditAppointmentParamsWithSameHours(2))
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      expect(storedAppointment.statusCode).toBe(403)
    })

    test('Should return 200 on create-appointment if selected appointment_date hour is not full', async () => {
      await appointmentCollection.insertMany(mockListOfEditAppointmentParamsWithSameHours(1))
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      expect(storedAppointment.statusCode).toBe(200)
    })
  })

  describe('POST /appointment/appointment_id', () => {
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
  })
  describe('GET /appointments', () => {
    test('Should return 200 on load appointments', async () => {
      await appointmentCollection.insertMany(mockAppointmentModels())
      const response = await request(app).get('/api/appointments')
      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBe(2)
    })
  })
  describe('DELETE /appointment/appointment_id', () => {
    test('Should return an appointment on success', async () => {
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      const { id } = storedAppointment.body
      const response = await request(app).delete('/api/appointment').send({ id: id })
      expect(response.statusCode).toBe(200)
      expect(response.body.name).toBe('any_name')
      const appointmentsListResponse = await request(app).get('/api/appointments')
      expect(appointmentsListResponse.body.length).toBe(0)
    })
  })
  describe('GET /appointment/appointment_id', () => {
    test('Should return an appointment if valid id is provided', async () => {
      const storedAppointment = await request(app).post('/api/appointment').send(mockAppointment())
      const { id } = storedAppointment.body
      const response = await request(app).get(`/api/appointment/${id}`)
      expect(response.statusCode).toBe(200)
      expect(response.body.name).toBe('any_name')
    })
  })
  describe('GET /appointment/restricted-dates', () => {
    test('Should return an list of restricted days and hours on success', async () => {
      await appointmentCollection.insertMany(mockListOfEditAppointmentParamsWithDifferentHours(20))
      await appointmentCollection.insertMany(mockListOfEditAppointmentParamsWithSameHours(2))
      const response = await request(app).get('/api/appointments/restricted-dates')
      expect(response.statusCode).toBe(200)
      expect(response.body.restrictedDays.length).toBe(1)
      expect(response.body.restrictedHours.length).toBe(1)
      expect(response.statusCode).toBe(200)
    })
  })
})
