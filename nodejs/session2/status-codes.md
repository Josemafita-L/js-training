# Common HTTP Status Codes

## 200 OK
Request completed successfully.

Example:
A user requests `/users` and the server returns the list of users.

---

## 201 Created
A new resource has been created successfully.

Example:
A new user account is created using a POST request.

---

## 400 Bad Request
The request is invalid due to incorrect data.

Example:
The client sends an invalid JSON body.

---

## 401 Unauthorized
Authentication is required.

Example:
A user tries to access an API without logging in.

---

## 403 Forbidden
The user is authenticated but does not have permission.

Example:
A normal user attempts to access the admin dashboard.

---

## 404 Not Found
The requested resource does not exist.

Example:
The client requests `/users/100` but that user does not exist.

---

## 500 Internal Server Error
The server encountered an unexpected error.

Example:
The application crashes while reading data from the database.