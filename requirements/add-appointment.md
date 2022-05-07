# Appointment Register

> ## Success Case

1. ✅ Receive a request of type **POST** in **/api/appointment** route
2. ✅ Validate if the required fields **name**, **birthday** and **appointment_date**
3. ✅ Validate if **birthday** and **appointment_date** is a valid date
4. ✅ Validate if the day of **appointment_date** does not have 20 or more recods on the database
5. ✅ Validate if the hour of **appointment_date** does not have 2 or more records on the database
6. ✅ Create a new **appointment** with not attended **status** and empty **appointment_commentary**
7. ✅ Returns code **200** with **appointment** data saved on database

> ## Exceptions

1. ✅ Return error code **404** if API does not exist
2. ✅ Return error code **400** if name or birthday or appointment_date is not provided
3. ✅ Return error code **400** if birthday or appointment_date are not a valid date
4. ✅ Return error code **403** if the day of appointment_date already have 20 or more records on the database
5. ✅ Return error code **403** if the hour of  appointment_date already have 2 or more records on the database
6. ✅ Return error code **500** if a error is throw when trying to create the appointment
