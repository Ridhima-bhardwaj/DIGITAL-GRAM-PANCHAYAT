# 🏗 System Architecture - Digital E-Gram Panchayat

## 👥 Users
- Citizens (users)
- Officers (admins)
- Staff (responders)

## 🔐 Authentication
- Firebase Authentication (Email/Password)
- Role stored in Firestore under `users` collection
- Dashboard redirection based on role

## 🗃 Database: Firestore
### 1. `users` collection
- Fields: `name`, `email`, `role`

### 2. `services` collection
- Fields: `title`, `description`

### 3. `complaints` collection
- Fields: `userId`, `category`, `description`, `status`, `response`

## 🧠 Frontend Architecture
- HTML pages per role (e.g., user-dashboard.html, officer-dashboard.html)
- Modular JavaScript files per responsibility
- Style consistency via `style.css`
- Language toggle implemented via class toggling (`.en`, `.hi`)

## 🔄 Workflow Summary
- User registers → redirected based on role
- User submits complaint → shown under My Status
- Officer adds/edits services + responds to complaints
- Staff updates complaint status

## 🌐 Deployment
- GitHub Pages + Firebase backend (Firestore/Auth)
