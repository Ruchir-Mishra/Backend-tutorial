# Intro to Backend — User + Post REST API

A **tutorial-aligned original companion project** for:
[freeCodeCamp — Intro to Backend Web Development (Node.js / Express)](https://www.youtube.com/watch?v=KOutPbKc9UM).

This is **not** the instructor's exact code; it implements the same learning topics with some additional protections (hashed passwords, real login/logout sessions, post ownership checks).



## Project structure

```
intro-to-backend/
  backend/src/
    index.js                    # Starts Express and connects to MongoDB
    models/User.js             # User document schema
    models/Post.js             # Post document schema
    models/Session.js          # Login sessions
    controllers/userController.js   # Register, login, logout, current user
    controllers/postController.js   # CRUD logic for posts
    routes/userRoutes.js       # User endpoint URLs
    routes/postRoutes.js       # Post endpoint URLs
    middleware/requireAuth.js  # Checks Bearer token
    middleware/errorHandler.js # Handles errors
  postman/
    Intro-to-Backend.postman_collection.json

  .gitignore
  package.json

```

## Request flow

Postman -> **Express route** -> **Controller function** -> **Mongoose model** -> MongoDB Atlas -> JSON response.

## Endpoints

| Method | Endpoint | Use | Login required? |
|---|---|---|---|
| GET | `/` | Server health check | No |
| POST | `/api/users/register` | Register user | No |
| POST | `/api/users/login` | Login, receive token | No |
| GET | `/api/users/me` | Retrieve current user | Yes |
| POST | `/api/users/logout` | Invalidate login token | Yes |
| POST | `/api/posts` | Create a post | Yes |
| GET | `/api/posts` | Retrieve all posts | No |
| GET | `/api/posts/:id` | Retrieve one post | No |
| PUT | `/api/posts/:id` | Update own post | Yes |
| DELETE | `/api/posts/:id` | Delete own post | Yes |

### Example request bodies

Register (POST `/api/users/register`):

```json
{"name":"Aman","email":"aman@example.com","password":"StrongPass123!"}
```

Login (POST `/api/users/login`):

```json
{"email":"aman@example.com","password":"StrongPass123!"}
```

Create Post (POST `/api/posts`, with `Authorization: Bearer <your_token>`):

```json
{"title":"My first post","content":"Learning Node and Express!"}
```

Update Post (PUT `/api/posts/:id`):

```json
{"title":"My updated post","content":"CRUD works!"}
```

## What do the files mean?

- **Model**: rules for what a User/Post document looks like in MongoDB.
- **Controller**: function that performs actual database operations.
- **Route**: pairs an HTTP method/URL with a controller.
- **Middleware**: code executed before a controller (for example, checking a login token).
- **`req.body`**: JSON sent by Postman. **`req.params.id`**: document ID from the URL.
- **`async/await`**: lets the API wait for database operations.
- **`.env`**: keeps the connection string private and local.

## Important notes

- Requires Node.js 20+, npm, and your own MongoDB Atlas credentials.
- MongoDB Atlas requires the correct network allowlist and database user.
- No real `.env` file, credentials, tokens or fake database records are bundled.
- `npm install` generates `package-lock.json`; commit that file to GitHub.
- The login token is saved by a Postman script for convenience; do not publish it.
- This coursework demo should not be exposed to the public internet without further security work.
