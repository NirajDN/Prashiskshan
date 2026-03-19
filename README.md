# Prashikshan - Academia Industry Interface


A mobile-friendly platform connecting students, educators, and industries for internships, projects, and mentorship.
<img width="1440" height="811" alt="Prashikshan" src="https://github.com/user-attachments/assets/820a9548-deb5-4a58-864e-e79bd0529f24" />

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, React Router, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Prerequisites
- Node.js installed on your machine.
- MongoDB installed locally or a MongoDB Atlas account.

## Setup Instructions

### 1. Database Connection (Important!)
To connect the application to a database, follow these steps:

**Option A: Local MongoDB (Recommended for development)**
1. Install MongoDB Community Edition.
2. Start the MongoDB service.
3. The default connection string is usually `mongodb://localhost:27017/prashikshan`.
4. This is already configured in `server/.env`.

**Option B: MongoDB Atlas (Cloud)**
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Click "Connect" -> "Connect your application".
3. Copy the connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/prashikshan`).
4. Open `server/.env` and replace `MONGO_URI` with your connection string.

### 2. Installation

**Frontend:**
```bash
cd client
npm install
npm run dev
```
The app will run at `http://localhost:5173` (or similar).

**Backend:**
```bash
cd server
npm install
npm start
````
The server will run at `http://localhost:5001`.

## Features
- **Smart Internship Marketplace**: Browse and apply for internships.
- **Mobile Friendly UI**: Responsive design for all devices.
- **Backend API**: connected to MongoDB for data persistence.

## Project Structure
- `client/`: React Frontend
- `server/`: Node/Express Backend
