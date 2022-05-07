# Appointment Update

> ## Success Case

1. ✅ Receive a request of type **PATCH** in **/api/appointment/appointment_id** route
2. ✅ Validate if the required field **appointment_id** is provided
3. ✅ Validate if provided **appointment_id** is related to an appointment stored in database
4. ✅ Validate **appointment_date** and **birthday** is a valid date if provided
5. ✅ Validate **appointment_date** day does not have 20 or more records on the database if provided
6. ✅ Validate **appointment_date** hour does not have 2 or more records on the database if provided
7. ✅ Update the **appointment** related to the **appointment_id** provided
8. ✅ Return code **200** with **appointment** updated data

> ## Exceptions

1. ✅ Return error code **404** if API does not exist
2. ✅ Return error code **400** if id related to an appointment_id is not provided
3. ✅ Return error code **400** if birthday or appointment_id is not a valid date, if provided
4. ✅ Return error code **400** if provided id is not related to any appointment id on the database
5. ✅ Return error code **403** if appointment_date day provided have 20 or more records on the database
6. ✅ Return error code **403** if appointment_date hour provided have 2 or more records on the database
7. ✅ Return error code **500** if a error is throw when trying to update the appointment
