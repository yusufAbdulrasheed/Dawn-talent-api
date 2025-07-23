# Talent Back-End API

## Overview

The Talent Back-End API is a Node.js/Express RESTful API for managing students, recruiters, and admins in a talent management platform. It supports authentication, profile management, requests, approvals, and more.

## Features

- **Authentication:** Register, login, and JWT-based authentication for all users.
- **Role Management:** Supports `admin`, `student`, and `recruiter` roles.
- **Student Features:**
  - View and update own profile
  - View all recruiters and recruiter profiles
  - View all other students
- **Recruiter Features:**
  - Create and update company profile
  - View own profile
  - View all students and student profiles
  - Request students from admin
- **Admin Features:**
  - Approve recruiter requests for students
  - Approve or disable recruiter profiles
  - View all recruiters and recruiter profiles
  - Create, view, and delete students

## API Documentation (Swagger)

Interactive API documentation is available via Swagger UI.

### How to Use Swagger

1. **Start the Server**
   ```
   npm start
   ```
   or
   ```
   node app.js
   ```

2. **Open Swagger UI**
   - Visit [http://localhost:5000/api-docs](http://localhost:5000/api-docs) in your browser.

3. **Navigating the Docs**
   - Endpoints are grouped by tags: `Auth`, `Students`, `Recruiters`, `Admin`.
   - Click on any endpoint to view details, required parameters, and example requests.
   - Use the "Try it out" button to test endpoints directly from the browser.
   - For protected endpoints, click "Authorize" and enter your JWT token.

### Example Endpoints

- `POST /register` — Register a new user
- `POST /login` — Login and receive a JWT token
- `GET /profile` — Get authenticated user's profile
- `PUT /update-profile` — Update student or recruiter profile
- `GET /view-recruiters` — View all recruiters (students)
- `GET /all-students` — View all students (recruiters)
- `POST /request-student` — Recruiter requests a student
- `POST /approve-request` — Admin approves recruiter request for a student

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Configure your environment variables (MongoDB URI, JWT secret, etc.).
4. Start the server and access Swagger UI for API exploration.

## Contributing

Feel free to open issues or submit pull requests for improvements.

