# content-submission-app

Overview

A simple full-stack app to submit content via a form and validate it on the backend.

🚀 Features

🔹 Frontend
Form: Heading, Paragraph, Image URL, Text Color
API integration using fetch
Success & error handling

🔹 Backend
Express API: /api/content
Validates required fields, HEX color, and image URL
Returns response and logs data

🛠️ Tech Stack
Frontend: React (Vite)
Backend: Node.js, Express


⚙️ Setup
Backend
cd backend
npm install
node server.js

Frontend
cd frontend
npm install
npm run dev


API----
POST /api/content

{
  "heading": "...",
  "paragraph": "...",
  "bgImage": "...",
  "textColor": "#fff"
}
Notes---
No database (data logged in backend)
Built for learning/demo

