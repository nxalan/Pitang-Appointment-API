export type AppointmentModel = {
  id: string
  name: string
  birthday: string
  appointment_date: string
  status: string
  status_comment: string
}

export type AppointmentResponseModel = {
  id: string
}

export type RestrictedDatesModel = {
  restrictedDays: string[]
  restrictedHours: string[]
}
