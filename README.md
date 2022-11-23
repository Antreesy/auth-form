# Code Challenge - Auth form with validation

### Technology stack:
- Typescript
- React
- Redux
- React Router

## Task:
Develop a SPA application using React, Redux, Webpack, or CRA.
Create multiple pages: Login, Registration, Change password.
Expandable menu to switch between pages with page name.

Registration:
1) Email - must validate that the email is correct
2) Password - validation of the number of characters (from 4 to 10) and for the presence of a capital letter.
3) Repeat password - must be identical to password.

Page with authorization:
1) Email - must validate that the email is correct
2) Password - validation of the number of characters (from 4 to 10) and for the presence of a capital letter.

Change password:
1) Old password
2) New password - validation of the number of characters (from 4 to 10) and the presence of a capital letter.
3) Repeat password - must be identical to password.

The password change page is available only to authorized users.
The registration and authorization pages are only unauthorized.
Make an imitation of a request to the server for each page and receive a response from the server about successful registration / authorization / password change.

Additions:
Using middleware for API
Saving the state of inputs when switching between pages.
Notification system: About an internal error, about the presence of an incorrect password, about successful login, registration, etc.

## Launch of the project

### `npm run start`

Starting the server with authorization data on [http://localhost:8000](http://localhost:8000)
Running the application on [http://localhost:3000](http://localhost:3000)

Login/password for login: admin@mail.ru / Admin123 or user@google.com / User12345, stored in db.json
Authorization data: stored in db.json
