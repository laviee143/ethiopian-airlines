# ✈️ Ethiopian Airlines Ticketing System

A full-stack flight booking application for Ethiopian Airlines, featuring a Java Servlet backend and a React (Vite) frontend.

## 🚀 Features
- **Flight Search**: Search for flights by Origin and Destination.
- **Real-time Availability**: View available flights with prices and schedules.
- **Booking System**: Select flights and book them with passenger details.
- **Responsive UI**: Modern interface built with React.

## 📸 Screenshots
<img width="1920" height="880" alt="image" src="https://github.com/user-attachments/assets/3c293cd8-88d6-4bc2-8472-116b78d99d58" />
<img width="1920" height="961" alt="image" src="https://github.com/user-attachments/assets/e8e99dc3-e248-451c-bd08-2b222fc38daa" />
<img width="1920" height="880" alt="image" src="https://github.com/user-attachments/assets/be85237e-0306-448f-9387-f7e7c7daa777" />
<img width="1920" height="880" alt="image" src="https://github.com/user-attachments/assets/67586c82-01a9-4aea-a269-129559c4cc03" />


## 🛠️ Technologies
- **Backend**: Java, Jakarta Servlet API, Jetty Server, Maven.
- **Frontend**: React, Vite, CSS3.
- **Data**: In-memory data storage (Singleton pattern) for demonstration.

## 📋 Prerequisites
- **Java JDK 11+**
- **Maven** (for backend)
- **Node.js & npm** (for frontend)

## 🏃‍♂️ How to Run

### 1. Start the Backend
Navigate to the `backend` directory and run:
```bash
cd backend
mvn jetty:run
```
*The server will start on `http://localhost:8080`*

### 2. Start the Frontend
Navigate to the `frontend` directory and run:
```bash
cd frontend
npm install
npm run dev
```
*The application will launch at `http://localhost:5173`*

## 🧪 Testing the App
1.  Open `http://localhost:5173`.
2.  **Search**: Try searching from **ADD** (Addis Ababa) to **NBO** (Nairobi).
3.  **Book**: Select a flight and complete the booking form.

