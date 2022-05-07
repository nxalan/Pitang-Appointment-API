# List Restricted Days and Hours

> ## Success Case

1. ✅ Receive a request of type **GET** in **/api/appointment/restricted-dates** route
2. ✅ Return code **200** with an object with an array of restricted days and hours

> ## Exceptions

1. ✅ Return error code **404** if API does not exist
2. ✅ Return error code **500** if a error is throw when trying to get the restricted days and hours