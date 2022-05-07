# List All Appointments

> ## Success Case

1. ✅ Receive a request of type **GET** in **/api/appointment** route
2. ✅ Return code **200** with an array of all updated **appointment**
3. ✅ Return **200** with an empty array if there is no stored appointment

> ## Exceptions

1. ✅ Return error code **404** if API does not exist
2. ✅ Return error code **500** if a error is throw when trying to get the appointments