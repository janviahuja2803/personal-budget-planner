# 💰 Personal Budget Planner (Full Stack)

A modern budgeting web app that allows users to sign up, log in, add expenses, upload CSVs from bank statements, view budget charts, and receive smart alerts before overspending. This is a full-stack project built using **Next.js**, **Node.js**, **Express**, and **MongoDB**, and deployed with **Vercel** (frontend) and **Render** (backend).

---

## 🔑 Features

- ✅ User authentication (Sign up & Login with JWT)
- ✅ Add expenses by category & description
- ✅ Upload CSVs (e.g. bank statements) via **PapaParse**
- ✅ Monthly summaries via bar and pie charts
- ✅ Smart budget alerts when nearing category or total limits
- ✅ Responsive layout with sidebar navigation
- ✅ MongoDB integration via Mongoose

---

## 🧱 Tech Stack

### Frontend
- Next.js (React + TypeScript)
- CSS Modules
- Chart.js
- PapaParse
- Vercel (Hosting)

### Backend
- Node.js + Express
- MongoDB Atlas
- Mongoose
- JWT for authentication
- Render (Hosting)

---

## 🗂️ Folder Structure

/personal-budget-planner (Frontend)
│
├── /components → UI components (AddExpense, Charts, Sidebar, etc.)
├── /pages → Routes (login, signup, dashboard)
├── /.env.local → Stores NEXT_PUBLIC_API_URL for backend
└── Vercel-deployed

/budget-backend (Backend)
│
├── /routes/auth.js → Signup & login routes
├── /models/User.js → User schema (username, password)
├── /server.js → Express server setup
├── /.env → Stores JWT_SECRET and Mongo URI
└── Render-deployed
## 🧪 Local Setup Instructions

### 1. Clone both repos
```bash
git clone https://github.com/janviahuja2803/personal-budget-planner
git clone https://github.com/janviahuja2803/budget-backend

run locally

cd budget-backend
npm install
node server.js

```env
MONGO_URI=your-mongodb-uri
JWT_SECRET=yourSecretKey

