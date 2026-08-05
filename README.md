# AI-Assisted Patient Care Platform — Frontend

React frontend for the AI-Assisted Patient Care Platform — a role-based portal experience for Patients, Doctors, and Administrators to manage appointments, availability, prescriptions, and payments.

**Backend repo:** [patient-care-platform](https://github.com/Manasajakka/patient-care-platform)

## Features

- Separate, personalized portals for Patients, Doctors, and Admins after login
- Real-time appointment booking with live open-slot search
- Stripe Elements integration for secure, embedded card payments
- AI assistant chat interface for medical Q&A
- Admin dashboard for reporting and user management
- Consistent, custom-designed UI (no component library — hand-built styling)

## Tech Stack

| Layer | Technology |
|---|---|
| Library | React 19 |
| Build Tool | Vite |
| Routing | React Router DOM |
| Payments UI | Stripe.js / React Stripe Elements |
| Styling | Custom inline styles (pastel blue design system) |

## Pages

| Page | Purpose |
|---|---|
| Register / Login | Account creation and role-based authentication |
| Patient / Doctor / Admin Portal | Personalized home base per role |
| Dashboard | Search open slots and book appointments |
| My Appointments | View booked appointments |
| Find a Doctor | Browse all doctors and specialties |
| Set Availability | Doctors define recurring weekly schedules |
| Complete Doctor/Patient Profile | Second-step onboarding after registration |
| Ask AI | Chat interface for the AI medical assistant |
| Payment | Real Stripe card payment form |
| Admin Panel / Clinic Reports | User management and date-range reporting |

## Running Locally

1. Clone the repo
2. Run `npm install`
3. Make sure the [backend](https://github.com/Manasajakka/patient-care-platform) is running on `http://localhost:8080`
4. Run `npm run dev`
5. App available at `http://localhost:5173`

## Key Design Decisions

- **Role-based routing** — after login, users are automatically directed to a portal matching their role, rather than one generic dashboard
- **Two-step onboarding** — registration only creates a login identity; a separate "Complete Profile" step captures role-specific details (mirrors real-world onboarding flows)
- **Stripe Elements** — card details are entered directly into Stripe's secure embedded form; this application's code never handles raw card numbers
