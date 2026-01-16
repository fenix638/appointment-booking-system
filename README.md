📅 Appointment Booking System

A full-stack appointment booking system built as a portfolio project, featuring a public booking flow, admin dashboard, availability management, and email confirmations.

Designed to demonstrate real-world architecture, clean code, and deployment best practices — without payments.

✨ Features

Public
* Select available date & time
* Create an appointment
* Automatic email confirmation

Admin

* Secure admin dashboard
* View & cancel bookings
* Manage availability by date and time slot

Technical

* Clean REST API
* Proper database modeling
* Server-side validation
* Side-effect isolation (email sending)
* Zero paid dependencies

🧱 Tech Stack

Frontend

* React 19
* Vite
* TypeScript
* Tailwind CSS
* Framer Motion

Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL

Infrastructure

* Vercel (Frontend)
* Railway (Backend + Database)
* Nodemailer (Email confirmation via Gmail App Password)

🗂️ Project Structure
appointment-booking-system/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── prisma/
│   │   └── server.ts
│   └── prisma/schema.prisma
│
└── README.md

⚙️ Local Development
1. Clone the repository
   git clone https://github.com/fenix638/appointment-booking-system.git
   cd appointment-booking-system

2. Backend Setup
   cd backend
   npm install


Create .env:

DATABASE_URL=postgresql://user:password@localhost:5432/appointments
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_app_password


Run migrations:

npx prisma migrate dev


Start server:

npm run dev

3. Frontend Setup
   cd frontend
   npm install
   npm run dev

🧪 Demo Credentials (Optional)
Admin access is intentionally simple for demo purposes.
Authentication can be added easily if required.

📩 Email Handling

Email confirmations are sent using Nodemailer with Gmail App Passwords to keep the project:

* Free
* Simple
* Easy to replace with transactional providers in production

🚀 Deployment

* Frontend deployed on Vercel
* Backend & PostgreSQL deployed on Railway
* Environment variables managed via platform dashboards

🧠 Design Decisions

* Availability is controlled by the admin, not inferred
* Emails are non-blocking side effects
* No payments to keep the project focused on core booking logic
* Prisma used for type-safe DB access
* UI built to resemble a small SaaS product, not a demo

📌 Future Improvements

* Authentication & role-based access
* Rescheduling appointments
* Calendar sync (Google / Outlook)
* Timezone support
* Admin analytics

👨‍💻 Author

Scott Thushyanthan
Full-Stack Developer
https://www.scott-thushyanthan.com/
https://www.linkedin.com/in/scott-jeluxsan-thushyanthan-b95430176/