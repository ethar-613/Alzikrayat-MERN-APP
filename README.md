# Alzikrayat — MERN Edition

> - name: ايثار عماد الدين احمد 
> - deparment: تقانة معلومات
- Advanced Web Technologies 
- Project 3 and 4 Assignment
- **Project 3** - building Alzikrayat photo sharing web application using MERN stack
- **Bonus Project 4** - Track (A), JWT-Based Authentication

## Description

Alzikrayat is a full-stack photo sharing application. Users can register and log in, upload photos, browse the gallery, open a photo to see its details, comment on photos, and delete their own photos. also they can see live statistics at home page for the photo, comments, users this website have for now.
In this version the basic login from Project 3 was replaced with **stateless JWT authentication**. The server gives the user a signed token after login/register, and the client sends this token with every request.

## Technologies

- **Frontend:** 
   - React (Vite), React Router, Axios
- **Backend:** 
   - Node.js, Express.js
- **Database:** 
   - MongoDB with Mongoose
- **Authentication:** 
   - JSON Web Tokens (jsonwebtoken), bcrypt for password hashing
- **Validation and uploads:** 
   - Joi, Multer
- **Config:** 
   - dotenv, cors

## Why did i choosed Track (A) JWT Authentication for project4

Login is used by every part of the app (upload, delete, comment), so JWT improves the whole project. The server no longer trusts a user id sent by the browser; it trusts only a token signed with a secret key.

## JWT Features

- POST /api/auth/register — hashes the password with bcrypt, creates the user, returns a JWT.
- POST /api/auth/login — checks the credentials, returns a JWT.
- GET /api/auth/me — returns the current user from the token (used to check the saved session when the app opens).
- Protected route middleware (server/middleware/auth.js) reads Authorization: Bearer <token>, verifies it, and applies to all write operations: upload photo, delete photo, add comment.
- The token is stored in localStorags, and an **Axios interceptor** (client/src/api/axios.js) adds the header automatically to every request.
- Logout clears the token and the user.
- **Last login cookie:** after every successful login a cookie (alzikrayat_last_login) is saved in the browser for **7 days**. The login page reads it and shows "Last login from this browser" with the name, email and time. The cookie never contains the password or the token.
- The JWT also lives for 7 days (JWT_EXPIRES_IN=7d), so the user stays logged in for a week.
- If the token is expired or invalid, the server returns 401 and the client logs the user out.
- The secret is kept in .env, never in the code.

## Project Structure

```
alzikrayt/
├── client/   React + Vite frontend (src/api, src/components, src/pages, src/context)
└── server/   Express backend (models, routes, controllers, middleware, uploads)
```

## Environment Variables

Copy server/.env.example to server/.env and fill in the values:
1. PORT:  Server port (default 5000) 
2. MONGODB_URI MongoDB connection string (local or Atlas) 
3. JWT_SECRET Long random secret used to sign tokens 
4. JWT_EXPIRES_IN Token lifetime, for example `7d` 

To generate a secret:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```


## How to Run the Project

**Requirements:** Node.js and a MongoDB database 

1. **Install and start the server**

   ```
   cd server
   npm install
   npm run dev
   ```

   The server runs on `http://localhost:5000`.

2. **Install and start the client** (in a second terminal)

   ```
   cd client
   npm install
   npm run dev
   ```

   Open `http://localhost:5173`.

## How to Test the JWT Feature

1. Register a new account, you are logged in and the navbar shows "Hi <firstName>!".
2. Open browser DevTools → Application → Local Storage, you will see `alzikrayat_token`.
3. Upload a photo or add a comment, the request has the `Authorization: Bearer ...` header (DevTools → Network).
4. Delete the token from Local Storage and try to upload, the request is rejected with 401.
5. Click Logout, the token is removed.
6. Open the login page again, you will see the "Last login from this browser" note (DevTools → Application → Cookies shows alzikrayat_last_login).

## API Summary

| Method | Route | Access |
| --- | --- | --- |
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Logged in |
| GET | /api/photos, /api/photos/:id | Public |
| POST | /api/photos | Logged in |
| DELETE | /api/photos/:id | Logged in, owner only |
| GET | /api/photos/:id/comments | Public |
| POST | /api/photos/:id/comments | Logged in |
