# 🚀 Cybergram — Full Stack Social Media Platform

Cybergram is a modern full-stack social media web application built with real-time chat, live notifications, post interactions, and secure authentication. It is designed with scalability and production-level architecture in mind.

---

## 🔥 Features

### 👤 Authentication
- Secure JWT based login & signup
- Protected routes
- Session + Local storage support

### 📰 Feed System
- Create posts with images
- Category based feed filtering
- Like, comment & save posts
- Infinite scrolling ready architecture

### ❤️ Likes & Comments
- Toggle like system
- Nested comment support
- Real-time updates via Socket.IO

### 👥 Follow System
- Follow / Unfollow users
- Live follow notifications
- Profile follower & following counts

### 🔔 Notifications
- Real-time notifications (like, follow, comment)
- Socket based delivery
- UI badge counter
- Notification dropdown panel

### 💬 Real-Time Chat
- Private 1-to-1 chat
- Message seen system
- Online / Offline presence
- Multi-device safe sockets
- Chat unread counter

### 🧑 Profile Management
- Edit bio
- Upload avatar
- View posts & saved posts
- Follow status indicator

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Socket.IO Client
- Material UI Icons

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon / Local)
- Socket.IO Server
- JWT Authentication
- Multer (Image Upload)

---

## 📂 Project Structure

cybergram/
│
├── client/ # React Frontend
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── api/
│
├── server/ # Express Backend
│ ├── controllers/
│ ├── routes/
│ ├── prisma/
│ └── middleware/
│
└── uploads/ # Uploaded Images


---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/cybergram.git
cd cybergram

2️⃣ Backend Setup

cd server
npm install

Create .env file:
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key


Run prisma:
npx prisma generate
npx prisma migrate dev

Start backend:
npm run dev 

3️⃣ Frontend Setup

cd client
npm install
npm run dev

🌐 Environment Requirements

.Node.js v18+

.PostgreSQL Database

.Prisma v5+

.Socket.IO

🔐 Security Features

.Password hashing

.Token protected routes

.Secure API middleware

.CORS protection

.Role-safe access logic

📈 Future Roadmap (v2)

.Story system

.Notification history page

.Media compression

.Post analytics dashboard

.Group chats

.Push notifications

.Mobile responsive optimization

👨‍💻 Developer

Shubham Panghal
Full Stack Web Developer
Cybergram Founder

⭐ Support

If you like this project, don't forget to give it a ⭐ on GitHub!