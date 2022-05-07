# List Appointment By Appointment ID

> ## Success Case

1. ✅ Receive a request of type **GET** in **/api/appointment/appointment_id** route
2. ✅ Validate if **appointment_id** provided is a valid id
3. ✅ Validate if **appointment_id** provided is related to an stored appointment
4. ✅ Return **200** with **appointment** data related to **appointment_id** provided

> ## Exceptions

1. ✅ Return error code **404** if API does not exist
2. ✅ Return error code **400** if appointment_id is not provided
3. ✅ Return error code **400** if there is no stored appointment related to the provided appointment_id
4. ✅ Return error code **500** if a error is throw when trying to get the appointment