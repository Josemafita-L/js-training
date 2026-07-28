# REST API Session 1 Activity

## Section 1 – Reading Existing APIs

### Task 1.1

**Command:**

```bash
curl -i https://jsonplaceholder.typicode.com/users
```

**Answers:**

- Status Code: **200 OK**
- Content-Type: **application/json**
- Number of Users Returned: **10**
- URL Structure: `/users` is a **collection resource** because it returns all users.
  curl -i https://jsonplaceholder.typicode.com/users/3

### Task 1.2

**Command 1**

```bash
curl -i https://jsonplaceholder.typicode.com/users/3
```

Returns the details of user ID 3.

**Command 2**

```bash
curl -i https://jsonplaceholder.typicode.com/users/9999
```

**Answers:**

- Status Code: _(write the status code you actually received)_
- Response Body: _(write `{}`, an empty body, or whatever was returned)_
- Observation: The API returns a response indicating that the requested resource does not exist.

### Task 1.3

**Command 1**

```bash
curl -i "https://jsonplaceholder.typicode.com/posts?userId=1"
```

**Command 2**

```bash
curl -i https://jsonplaceholder.typicode.com/users/1/posts
```

**Answers:**

- Number of Posts Returned: **10**
- Path: `/posts`
- Query String: `?userId=1`
- Both requests return the same posts.
- Preferred URL: `/users/1/posts` because it clearly represents the relationship between a user and their posts.

## Section 2 – HTTP Methods

### Task 2.1 – POST

**Command**

```bash
curl -X POST https://jsonplaceholder.typicode.com/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"REST is easy","body":"Once you know the verbs","userId":1}'
```

**Answers**

- Status Code: **201 Created**
- Response Body: Returns the created resource with an assigned ID.
- Assigned ID: **101**
- Location Header: Not present. JSONPlaceholder does not return a `Location` header.

**Comment**

Sending the same POST request again would attempt to create another resource. In a real application, if duplicates are not allowed, the server could return **409 Conflict**.

### Task 2.2 – PUT and PATCH

**PUT Command**

```bash
curl -X PUT https://jsonplaceholder.typicode.com/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"id":1,"title":"Replaced title","body":"All fields replaced","userId":1}'
```

**PATCH Command**

```bash
curl -X PATCH https://jsonplaceholder.typicode.com/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Just the title changed"}'
```

**Answers**

- PUT response contains all fields because it replaces the complete resource.
- PATCH response contains only the updated field(s) because it performs a partial update.
- PATCH needs only one field because only that field is being modified.

**When to use PUT**

Use PUT when replacing an entire resource, such as updating all details of an intern.

**When to use PATCH**

Use PATCH when updating only one or a few fields, such as changing only an intern's score.

### Task 2.3 – DELETE

**Command**

```bash
curl -i -X DELETE https://jsonplaceholder.typicode.com/posts/1
```

**Answers**

- Status Code: **200 OK** (or write the actual status you received)
- Response Body: Empty

**Comment**

Although JSONPlaceholder returns **200 OK**, many REST APIs prefer **204 No Content** for a successful DELETE because the resource has been removed and there is no response body to return.

### Task 2.3 – DELETE

**Command**

```bash
curl -i -X DELETE https://jsonplaceholder.typicode.com/posts/1
```

**Answers**

- Status Code: **200 OK** (or write the actual status you received)
- Response Body: Empty

**Comment**

Although JSONPlaceholder returns **200 OK**, many REST APIs prefer **204 No Content** for a successful DELETE because the resource has been removed and there is no response body to return.

## Section 3 – Status Codes

### Task 3.1

| Scenario                                     | Status Code               | Reason                                               |
| -------------------------------------------- | ------------------------- | ---------------------------------------------------- |
| GET /interns – 15 interns found              | 200 OK                    | Request succeeded and returned data.                 |
| POST /interns – intern created successfully  | 201 Created               | A new resource was created.                          |
| DELETE /interns/42 – deleted, no body needed | 204 No Content            | Resource deleted successfully with no response body. |
| GET /interns/9999 – intern not found         | 404 Not Found             | Requested resource does not exist.                   |
| POST /interns – missing `name` field         | 400 Bad Request           | Client sent invalid request data.                    |
| GET /interns – user not logged in            | 401 Unauthorized          | Authentication is required.                          |
| GET /interns/42 – user is not an admin       | 403 Forbidden             | User is authenticated but lacks permission.          |
| POST /interns – database crashed             | 500 Internal Server Error | Server encountered an unexpected error.              |

### Task 3.2

#### Bug A

- Wrong: 200 OK
- Correct: 404 Not Found
- Reason: The requested intern does not exist.

#### Bug B

- Wrong: 200 OK
- Correct: 201 Created
- Reason: A new resource was created successfully.

#### Bug C

- Wrong: 200 OK
- Correct: 204 No Content
- Reason: The resource was deleted successfully and no response body is required.

#### Bug D

- Wrong: 403 Forbidden
- Correct: 401 Unauthorized
- Reason: The authentication token has expired.

#### Comment

Returning `200 OK` with an error message is misleading because clients treat `200` as success. Using the correct HTTP status code allows frontend applications to detect and handle errors correctly.

## Section 4 – Parameters

### Task 4.1

| Scenario                            | Correct URL                                | Parameter Type   |
| ----------------------------------- | ------------------------------------------ | ---------------- |
| Get intern #7                       | GET /interns/7                             | Path Parameter   |
| Get Frontend interns                | GET /interns?role=Frontend                 | Query Parameter  |
| Get first 5 interns sorted by score | GET /interns?limit=5&sort=score&order=desc | Query Parameters |
| Get attendance of intern 42         | GET /interns/42/attendance                 | Path Parameter   |
| Search interns named Rahu           | GET /interns?name=Rahu                     | Query Parameter  |

### Task 4.2

**Command**

```bash
curl -i https://jsonplaceholder.typicode.com/users \
  -H "Authorization: Bearer my-fake-token" \
  -H "Accept: application/json"
```

**Answers**

- The fake token did not cause a 401 because JSONPlaceholder ignores the Authorization header.
- In a real API, the server would validate the token before processing the request.
- 401 Unauthorized means the user is not authenticated.
- 403 Forbidden means the user is authenticated but does not have permission to access the resource.

## Section 4 – Task 4.3 – Design the Intern Dashboard API

| Action                           | Method | URL                     | Request Body                                                                  | Expected Status |
| -------------------------------- | ------ | ----------------------- | ----------------------------------------------------------------------------- | --------------- |
| List all interns                 | GET    | `/interns`              | None                                                                          | 200 OK          |
| Get intern #7                    | GET    | `/interns/7`            | None                                                                          | 200 OK          |
| Create a new intern              | POST   | `/interns`              | `{ "name":"Rahul", "role":"Backend", "score":90, "isPresent":true }`          | 201 Created     |
| Update intern #7's score only    | PATCH  | `/interns/7`            | `{ "score":95 }`                                                              | 200 OK          |
| Replace intern #7 entirely       | PUT    | `/interns/7`            | `{ "id":7, "name":"Rahul", "role":"Frontend", "score":95, "isPresent":true }` | 200 OK          |
| Delete intern #7                 | DELETE | `/interns/7`            | None                                                                          | 204 No Content  |
| List interns with role = Backend | GET    | `/interns?role=Backend` | None                                                                          | 200 OK          |
| Get all attendance for intern #7 | GET    | `/interns/7/attendance` | None                                                                          | 200 OK          |

### Comment

I would use `/interns/{id}/attendance` because attendance belongs to a specific intern, making the relationship clear and intuitive. However, if attendance records needed to be managed independently or queried across all interns, a separate `/attendance` resource would be more suitable. The choice depends on whether attendance is considered a child resource of an intern or an independent resource.

## Section 5 – curl Mastery

### Task 5.1 – Verbose Debugging

**Command**

```bash
curl -v https://jsonplaceholder.typicode.com/users/1
```

**Answers**

- Lines beginning with `>` are the **request headers** sent by curl.
- Lines beginning with `<` are the **response headers** returned by the server.
- The blank line separates the HTTP headers from the response body.
- The automatically sent Host header is:

```
Host: jsonplaceholder.typicode.com
```

### Task 5.2 – Chain Requests

**Command 1**

```bash
curl -s -X POST https://jsonplaceholder.typicode.com/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My intern","body":"score 92","userId":1}'
```

**Command 2**

```bash
curl -i https://jsonplaceholder.typicode.com/posts/101
```

**Comment**

In a real application, the **service layer** should make the POST request. The UI should call the service layer instead of directly making HTTP requests. This keeps the application modular, reusable, and easier to maintain.

### Task 5.3 – Error Handling

**Command 1**

```bash
curl -X POST https://jsonplaceholder.typicode.com/posts \
  -d '{"title":"missing header","body":"no content type","userId":1}'
```

**Command 2**

```bash
curl -i https://jsonplaceholder.typicode.com/nonexistent
```

**Answers**

- JSONPlaceholder accepted the POST request even without the `Content-Type` header because it is a fake API. A production API should normally require the correct content type.
- The non-existent endpoint returned **404 Not Found**.
- A production API should return a structured JSON error response, for example:

```json
{
  "error": "Not Found",
  "message": "The requested resource does not exist."
}
```

## Section 6 – Design Challenge

### Task 6.1 – Spot the Design Mistakes

| Mistake                                             | What's Wrong                                        | Correct Design                          |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------- |
| GET /getAllInterns                                  | Uses an action name instead of a resource name.     | GET /interns                            |
| POST /interns/delete/42                             | Uses POST and an action in the URL.                 | DELETE /interns/42                      |
| GET /createIntern?name=Rahul&role=Frontend&score=88 | GET should not create resources.                    | POST /interns with request body         |
| POST /interns/42/updateScore                        | Uses POST and an action name for updating.          | PATCH /interns/42 with `{ "score":95 }` |
| DELETE /interns?id=42                               | Uses a query parameter for resource identification. | DELETE /interns/42                      |

## Section 6 – Design Challenge

### Task 6.1 – Spot the Design Mistakes

| Mistake                                             | What's Wrong                                        | Correct Design                          |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------- |
| GET /getAllInterns                                  | Uses an action name instead of a resource name.     | GET /interns                            |
| POST /interns/delete/42                             | Uses POST and an action in the URL.                 | DELETE /interns/42                      |
| GET /createIntern?name=Rahul&role=Frontend&score=88 | GET should not create resources.                    | POST /interns with request body         |
| POST /interns/42/updateScore                        | Uses POST and an action name for updating.          | PATCH /interns/42 with `{ "score":95 }` |
| DELETE /interns?id=42                               | Uses a query parameter for resource identification. | DELETE /interns/42                      |

### Comment

Both designs are valid. I would use `/projects/{projectId}/interns/{internId}` because the action is assigning an intern to a specific project, making the project the primary resource. If the application is centred around interns and their assignments, `/interns/{internId}/projects/{projectId}` could also be appropriate. The choice depends on which resource owns and manages the relationship.
