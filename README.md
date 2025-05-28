# 🛠️ Freelance Job Board Backend API

This is a **fully functional RESTful API** built with **Node.js**, **Express**, and **MongoDB** for a Freelance Job Board platform. It supports user registration, job posting, bidding, contracts, reviews, admin moderation, and  Messaging System (Client ↔ Freelancer).

---

## 🚀 Features

### 👥 User Management
- Register/Login with JWT
- Role-based access (Client or Freelancer or Admin)
- Update profile info, skills, and portfolio

### 📋 Job Management
- Clients create, update, and delete job posts
- Filter jobs by category, skills, budget, and deadline
- Admin controls for approving/rejecting jobs

### 💰 Bidding System
- Freelancers place/update/withdraw bids
- Clients view bids on their jobs
- Filter bids by budget, delivery time, and more

### 📑 Contract Management
- Contracts created when bids are accepted
- View contracts (by client/freelancer)
- Manage statuses: Active, Completed, Cancelled
- Add milestones and deliverables

### ⭐ Reviews & Ratings
- Users leave ratings and comments after contract completion
- Reviews appear on public profiles

### ❤️ Saved Jobs & Watchlist
- Freelancers can save jobs
- Clients can add freelancers to watchlists

### 👮 Admin APIs
- Suspend/ban users
- Moderate jobs and bids

---

## 🏗️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication (`jsonwebtoken`)
- Password hashing with `bcrypt`
- Input validation with `express-validator`
- Environment variables with `dotenv`
- Security middlewares: `cors`, `cookie-parser`, Helmet (if used)
- Development tool: `nodemon` for auto-restart


---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/freelance-job-board-api.git
cd freelance-job-board-api
```

### Install dependencies
- npm install

###  Create .env file
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key

### Run the server


## 📪 API Endpoints

> Base URL: `http://localhost:3000/users`

### 🔐 Auth
- `POST /register` – Register a new user
- `POST /login` – Login and receive JWT token
- `POST /logout` – Logout user

### 👤 Users
- `GET /profile` – Get current user profile
- `POST /update` – Update profile (skills, portfolio)

### 📋 Jobs
- `POST /jobPost` – Create a job (Client only)
- `GET /jobs` – List/filter jobs
- `POST /updateJob/:id` – Update a job
- `DELETE /deleteJob/:id` – Delete a job
- `GET /filterJobs/:id` – Filter jobs

### 💰 Bids
- `POST /postBids` – Place a bid on a job (Freelancer)
- `GET /bids` – View all bids
- `PUT /bids/:id` – Update a bid
- `PUT /bids/:id` – Withdraw a bid

### 📑 Contracts
- `POST /createContract` – Create a contract (on bid acceptance)
- `GET /contracts` – List contracts for current user
- `PUT /updateContract/:id` – Update contract status

### ⭐ Reviews
- `POST /review` – Leave a review after contract completion
- `GET /reviews/:contractId` – View reviews for a contract

### ❤️ Saved Jobs & Watchlist
- `POST /save_job` – Save a job (Freelancer)
- `GET /saved_jobs/:id` – Get saved jobs
- `POST /watchList` – Add freelancer to watchlist (Client)
- `GET /watchList/:id` – View watchlist (Client)

### 👮 Admin APIs
- `POST /bannedUser` – Suspend or ban a user
- `PUT /status_job/:id` – Approve/reject job post
- `PUT /status_bids/:id` – Approve/reject bid

### 💬 Messages
- `POST /message` – Send a message between users
- `GET /message/:user1/:user2` – Get messages between two users

## API Response Examples

### POST `/users/register`

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "securePass123",
  "role": "freelancer",
  "skills": ["React", "Node.js"],
  "portfolio": [
    {
      "title": "Portfolio Site",
      "description": "My personal website",
      "link": "https://alice.dev"
    }
  ],
  "bio": "Frontend developer with 5 years experience",
  "avatar": "https://example.com/avatar.jpg"
}

responde 201
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "_id": "60b8d295f6d12c001f34a123",
    "name": "Alice",
    "email": "alice@example.com",
    "role": "freelancer",
    "skills": ["React", "Node.js"],
    "portfolio": [
      {
        "title": "Portfolio Site",
        "description": "My personal website",
        "link": "https://alice.dev"
      }
    ],
    "bio": "Frontend developer with 5 years experience",
    "avatar": "https://example.com/avatar.jpg",
    "isBanned": false,
    "createdAt": "2025-05-27T12:00:00.000Z",
    "updatedAt": "2025-05-27T12:00:00.000Z"
  }
}
```

### POST `/users/login`

```json
📥 Request Body
json
Copy
Edit
{
  "email": "alice@example.com",
  "password": "securePass123"
}
📤 Response 200 OK
json
Copy
Edit
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "_id": "60b8d295f6d12c001f34a123",
    "name": "Alice",
    "email": "alice@example.com",
    "role": "freelancer",
    "skills": ["React", "Node.js"],
    "portfolio": [
      {
        "title": "Portfolio Site",
        "description": "My personal website",
        "link": "https://alice.dev"
      }
    ],
    "bio": "Frontend developer with 5 years experience",
    "avatar": "https://example.com/avatar.jpg",
    "isBanned": false,
    "createdAt": "2025-05-27T12:00:00.000Z",
    "updatedAt": "2025-05-27T12:00:00.000Z"
  }
}
```

### GET `/users/profile`

```json
Response 200 OK
json
Copy
Edit
{
  "_id": "60b8d295f6d12c001f34a123",
  "name": "Alice",
  "email": "alice@example.com",
  "role": "freelancer",
  "skills": ["React", "Node.js"],
  "portfolio": [
    {
      "title": "Portfolio Site",
      "description": "My personal website",
      "link": "https://alice.dev"
    }
  ],
  "bio": "Frontend developer with 5 years experience",
  "avatar": "https://example.com/avatar.jpg",
  "isBanned": false,
  "createdAt": "2025-05-27T12:00:00.000Z",
  "updatedAt": "2025-05-27T12:00:00.000Z"
}
```

### 🚪 POST /users/logout — Logout Us
```json
📤 Response 200 OK
json
Copy
Edit
{
  "message": "Logout successfully"
}
```

### 💾 POST /users/saved-jobs — Save Job (Freelancer)

```json
📥 Request Body
json
Copy
Edit
{
  "freelancerId": "USER_ID",
  "jobId": "JOB_ID"
}
📤 Response 201 Created
json
Copy
Edit
{
  "_id": "SAVED_JOB_ID",
  "freelancer": "USER_ID",
  "job": "JOB_ID",
  "createdAt": "2025-05-27T12:00:00.000Z",
  "updatedAt": "2025-05-27T12:00:00.000Z"
}
```
### 📂 GET /users/saved-jobs/:id — Get Saved Jobs
```json
[
  {
    "_id": "SAVED_JOB_ID",
    "freelancer": "USER_ID",
    "job": {
      "_id": "JOB_ID",
      "title": "Frontend Developer",
      "description": "Build UI for a web app",
      "company": "Tech Corp",
      "location": "Remote",
      "salary": 5000,
      "skillsRequired": ["React", "Tailwind CSS"],
      "postedBy": "CLIENT_ID"
    }
  }
]
```
###  DELETE /users/saved-jobs

```json
📥 Request Body
json
Copy
Edit
{
  "freelancerId": "USER_ID",
  "jobId": "JOB_ID"
}
📤 Response 200 OK
json
Copy
Edit
{
  "message": "Job removed from saved list."
}
```

### 👀 GET /users/watchlist/:clientId — View Watchlist (Client)

```json
📤 Response 200 OK
json
Copy
Edit
[
  {
    "_id": "WATCHLIST_ID",
    "client": "CLIENT_ID",
    "freelancer": {
      "_id": "FREELANCER_ID",
      "name": "Jane Doe",
      "skills": ["Vue", "Laravel"],
      "bio": "Full-stack developer",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
]
```

### 🎯 POST /users/bids — Place a Bid on a Job (Freelancer)
```json
📥 Request Body
json
Copy
Edit
{
  "freelancerId": "FREELANCER_ID",
  "jobId": "JOB_ID",
  "proposal": "I can deliver this in 5 days.",
  "deliveryTime": 5,
  "amount": 300
}
📤 Response 201 Created
json
Copy
Edit
{
  "_id": "BID_ID",
  "freelancer": "FREELANCER_ID",
  "job": "JOB_ID",
  "proposal": "I can deliver this in 5 days.",
  "deliveryTime": 5,
  "amount": 300,
  "status": "pending",
  "createdAt": "2025-05-27T12:00:00.000Z"
}
```

### ✏️ PUT /users/bids/:id — Update or Withdraw a Bid
```json
Freelancer updates or cancels a bid.

📥 Request Body
json
Copy
Edit
{
  "proposal": "Updated proposal text",
  "deliveryTime": 7,
  "amount": 350,
  "status": "withdrawn"
}
📤 Response 200 OK
json
Copy
Edit
{
  "message": "Bid updated successfully"
}

```
### 🤝 POST /users/contracts
```json
📥 Request Body
json
Copy
Edit
{
  "freelancerId": "FREELANCER_ID",
  "clientId": "CLIENT_ID",
  "jobId": "JOB_ID",
  "bidId": "BID_ID",
  "milestones": [
    { "title": "UI Phase", "amount": 150 },
    { "title": "Backend Phase", "amount": 150 }
  ]
}
📤 Response 201 Created
json
Copy
Edit
{
  "_id": "CONTRACT_ID",
  "status": "active",
  "milestones": [...],
  "createdAt": "2025-05-27T12:00:00.000Z"
}
```

### 🔄 PUT /users/contracts/:id — Update Contract Status
```json
📥 Request Body
json
Copy
Edit
{
  "status": "completed"
}
📤 Response 200 OK
json
Copy
Edit
{
  "message": "Contract status updated"
}
```

### 📄 GET /users/contracts — View Contracts by User
```json
📤 Response 200 OK
json
Copy
Edit
[
  {
    "_id": "CONTRACT_ID",
    "freelancer": { "_id": "FREELANCER_ID", "name": "John" },
    "client": { "_id": "CLIENT_ID", "name": "Acme Inc" },
    "job": { "_id": "JOB_ID", "title": "Mobile App" },
    "status": "active"
  }
]
```
### 🌟 POST /users/reviews — Leave a Review After Contract

```json
📥 Request Body
json
Copy
Edit
{
  "contractId": "CONTRACT_ID",
  "reviewerId": "USER_ID",
  "revieweeId": "USER_ID",
  "rating": 5,
  "comment": "Great to work with!"
}
📤 Response 201 Created
json
Copy
Edit
{
  "_id": "REVIEW_ID",
  "rating": 5,
  "comment": "Great to work with!",
  "createdAt": "2025-05-27T12:00:00.000Z"
}
```
### 👤 GET /users/users/:userId/reviews — Get Reviews for a User
```json
📤 Response 200 OK
json
Copy
Edit
[
  {
    "_id": "REVIEW_ID",
    "reviewer": { "_id": "USER_ID", "name": "Alice" },
    "rating": 4,
    "comment": "Professional and quick"
  }
]
```
### 🚫 PUT /users/admin/users/:id/status — Suspend or Ban a User
```json
📥 Request Body
json
Copy
Edit
{
  "isBanned": true
}
📤 Response 200 OK
json
Copy
Edit
{
  "message": "User status updated successfully"
}
```

### ✅ PUT /users/admin/jobs/:jobId — Approve or Reject a Job
```json
📥 Request Body
json
Copy
Edit
{
  "isApproved": true
}
📤 Response 200 OK
json
Copy
Edit
{
  "message": "Job approval status updated"
}

```

###  PUT /users/admin/bids/:bidId — Approve or Reject a Bid

```json
📥 Request Body
json
Copy
Edit
{
  "isApproved": false
}
📤 Response 200 OK
json
Copy
Edit
{
  "message": "Bid approval status updated"
}
```

### 📨 POST /user/messages
```json
Request Body
json
Copy
Edit
{
  "sender": "USER_ID_1",
  "receiver": "USER_ID_2",
  "jobOrContract": "JOB_OR_CONTRACT_ID",
  "contextType": "job",  // or "contract"
  "message": "Hello, I have a question about the project."
}
Response 201 Created
json
Copy
Edit
{
  "_id": "MESSAGE_ID",
  "sender": "USER_ID_1",
  "receiver": "USER_ID_2",
  "jobOrContract": "JOB_OR_CONTRACT_ID",
  "contextType": "job",
  "message": "Hello, I have a question about the project.",
  "createdAt": "2025-05-28T10:00:00.000Z",
  "updatedAt": "2025-05-28T10:00:00.000Z",
  "__v": 0
}

```

### GET /users/message/:user1/:user2
```json
Example Request
swift
Copy
Edit
GET /api/message/USER_ID_1/USER_ID_2
Response 200 OK
json
Copy
Edit
[
  {
    "_id": "MESSAGE_ID_1",
    "sender": "USER_ID_1",
    "receiver": "USER_ID_2",
    "jobOrContract": "JOB_OR_CONTRACT_ID",
    "contextType": "job",
    "message": "Hello, I have a question about the project.",
    "createdAt": "2025-05-28T10:00:00.000Z",
    "updatedAt": "2025-05-28T10:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "MESSAGE_ID_2",
    "sender": "USER_ID_2",
    "receiver": "USER_ID_1",
    "jobOrContract": "JOB_OR_CONTRACT_ID",
    "contextType": "job",
    "message": "Sure, how can I help you?",
    "createdAt": "2025-05-28T10:05:00.000Z",
    "updatedAt": "2025-05-28T10:05:00.000Z",
    "__v": 0
  }
]
```

