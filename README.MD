# 🚀 Cybergram — Full Stack Social Media Platform

Cybergram is a modern full-stack social media web application featuring real-time chat, live notifications, post interactions, and secure authentication. It is built with scalability, performance, and production-ready architecture in mind.

---

## 🔥 Features

### 👤 Authentication
- Secure JWT-based login & signup
- Protected routes
- LocalStorage + SessionStorage support
- Token-based session handling

### 📰 Feed System
- Create posts with images
- Category-based feed filtering
- Like, comment & save posts
- Optimized feed rendering architecture

### ❤️ Likes & Comments
- Toggle like system
- Nested comment support
- Real-time updates using Socket.IO

### 👥 Follow System
- Follow / Unfollow users
- Live follow notifications
- Follower & following counters
- Profile relationship tracking

### 🔔 Notifications System
- Real-time notifications (like, follow, comment)
- Socket-based delivery
- Notification badge counter
- Interactive dropdown panel

### 💬 Real-Time Chat System
- Private 1-to-1 chat
- Message seen delivery status
- Online / Offline presence tracking
- Multi-device & multi-tab safe sockets
- Unread chat counter

### 🧑 Profile Management
- Edit user bio
- Upload profile avatar
- View personal posts
- Saved posts section
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
- Multer (Image Upload Handling)

---

## 📂 Project Structure

```
cybergram/
│
├── client/          # React Frontend
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── api/
│
├── server/          # Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── prisma/
│   └── middleware/
│
└── uploads/         # User Uploaded Media
```

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/cybergram.git
cd cybergram
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file inside `server`:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

Start backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🌐 Environment Requirements

- Node.js v18+
- PostgreSQL Database
- Prisma v5+
- Socket.IO
- Modern Browser (Chrome / Edge / Firefox)

---

## 🔐 Security Features

- Password hashing
- JWT protected routes
- Secure API middleware
- CORS protection
- Token verification layer
- Authorization validation

---

## 📈 Future Roadmap (v2)

- Story system
- Notification history panel
- Media optimization & compression
- Post analytics dashboard
- Group chat system
- Push notifications
- Advanced mobile responsiveness

---

## 👨‍💻 Developer

**Shubham Panghal**  
Full Stack Web Developer  
Founder — Cybergram  

---

## ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub — it helps the project grow and motivates future development 🚀
