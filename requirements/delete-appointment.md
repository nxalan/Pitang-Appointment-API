# Appointment Deletion

> ## Success Case

1. ✅ Receive a request of type **POST** in **/api/appointment/delete** route with **id** in request body
2. ✅ Validate if **id** is an valid appointment id
3. ✅ Validate if **id** is related to an stored appointment id
4. ✅ Delete the **appointment** related to the provided **id**
5. ✅ Return **200** with **appointment** data that has been deleted

> ## Exceptions

1. ✅ Return error code **404** if API does not exist
2. ✅ Return error code **400** if appointment id is not provided
3. ✅ Return error code **400** if there is no appointment related to the appointment id provided
4. ✅ Return error code **500** if a error is throw when trying to delete the appointment
