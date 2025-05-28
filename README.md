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
- JWT Authentication
- bcrypt.js (password hashing)
- Helmet, CORS, Rate Limiting (security)

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



