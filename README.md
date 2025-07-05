# Task Manager API

A RESTful API for task management built with NestJS, TypeORM, and MySQL. This API provides user authentication and comprehensive task management capabilities.

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Task Management**: Full CRUD operations for tasks
- **Task Filtering**: Filter tasks by status and search terms
- **Profile Management**: Update user profile and password
- **Input Validation**: Comprehensive validation using class-validator
- **Database**: MySQL with TypeORM for robust data persistence

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: MySQL
- **ORM**: TypeORM
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Password Hashing**: bcrypt
- **Language**: TypeScript

## 📦 Installation

```bash
# Install cross-env globally (required for environment management)
npm install -g cross-env

# Install dependencies
yarn install
```

## 🔧 Environment Variables

This project uses stage-based environment configuration. The application loads environment variables from `.env.stage.${STAGE}` files based on the `STAGE` variable.

**Environment File Selection:**
- Development: `.env.stage.dev` (when `STAGE=dev`)
- Production: `.env.stage.prod` (when `STAGE=prod`)

Create the appropriate `.env.stage.${stage}` file with the following variables:

```env
# .env.stage.dev
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
JWT_SECRET=your-super-secret-jwt-key
```

> **Note**: I've left example environment files in this repository for demonstration purposes. 
> **DON'T DO THIS IN YOUR PRODUCTION PROJECTS!** 😵 
> Always add `.env*` files to your `.gitignore` to keep your secrets safe! 🔐

## 🏃 Running the Application

```bash
# Development mode
yarn start:dev

# Production mode
yarn start:prod
```

The API will be available at `http://localhost:3000`

## 📋 API Endpoints

### 🔐 Authentication Endpoints

> **🔒 Authentication Required**: All endpoints marked with 🔒 require a valid JWT token in the Authorization header: `Authorization: Bearer <access_token>`

#### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Validation Rules:**
- `fullName`: 4-24 characters
- `email`: Valid email format
- `password`: 8-32 characters, must contain uppercase, lowercase, and number/special character

**Response:**
```json
{
  "statusCode": 201,
  "message": "User created successfully"
}
```

#### POST /auth/signin
Sign in with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 🔒 GET /auth/profile
Get current user profile.

**Response:**
```json
{
  "id": "uuid",
  "fullName": "John Doe",
  "email": "john@example.com"
}
```

#### 🔒 PATCH /auth/profile
Update user profile.

**Request Body:**
```json
{
  "fullName": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response:**
```json
{
  "id": "uuid",
  "fullName": "John Smith",
  "email": "johnsmith@example.com"
}
```

#### 🔒 PATCH /auth/password
Update user password.

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!",
  "confirmPassword": "NewPass123!"
}
```

**Response:**
```json
{
  "message": "Password updated successfully"
}
```

### 📝 Task Management Endpoints

#### 🔒 GET /tasks
Get all tasks for the authenticated user with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by task status (`OPEN`, `IN_PROGRESS`, `DONE`)
- `search` (optional): Search tasks by title or description

**Examples:**
```
GET /tasks
GET /tasks?status=OPEN
GET /tasks?search=project
GET /tasks?status=IN_PROGRESS&search=urgent
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "IN_PROGRESS",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z"
  }
]
```

#### 🔒 GET /tasks/:id
Get a specific task by ID.

**Response:**
```json
{
  "id": "uuid",
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "IN_PROGRESS",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

#### 🔒 POST /tasks
Create a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description here"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "New Task",
  "description": "Task description here",
  "status": "OPEN",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

#### 🔒 PATCH /tasks/:id
Update a task.

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "IN_PROGRESS"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

#### 🔒 PATCH /tasks/:id/status
Update only the status of a task.

**Request Body:**
```json
{
  "status": "DONE"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Task Title",
  "description": "Task description",
  "status": "DONE",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

#### 🔒 DELETE /tasks/:id
Delete a task.

**Response:**
```json
{
  "statusCode": 200,
  "message": "Task deleted successfully"
}
```

## 📊 Task Status Values

Tasks can have one of three statuses:
- `OPEN`: Task is created but not started
- `IN_PROGRESS`: Task is being worked on
- `DONE`: Task is completed

## 🔒 Authentication

This API uses JWT (JSON Web Tokens) for authentication. After signing in, include the token in the Authorization header for all protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## ❌ Error Responses

The API returns structured error responses:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error



## 📝 API Usage Examples

### JavaScript/TypeScript Example

```javascript
// Sign in
const signInResponse = await fetch('http://localhost:3000/auth/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123!'
  })
});

const { accessToken } = await signInResponse.json();

// Create a task
const createTaskResponse = await fetch('http://localhost:3000/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    title: 'New Task',
    description: 'Task description'
  })
});

const newTask = await createTaskResponse.json();
```

### cURL Examples

```bash
# Sign in
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123!"}'

# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"title":"New Task","description":"Task description"}'

# Get all tasks
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer <your_token>"
```

## 🗃️ Database Schema

### Users Table
- `id`: UUID (Primary Key)
- `fullName`: String
- `email`: String (Unique)
- `password`: String (Hashed)

### Tasks Table
- `id`: UUID (Primary Key)
- `title`: String
- `description`: String
- `status`: Enum (OPEN, IN_PROGRESS, DONE)
- `userId`: UUID (Foreign Key)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
