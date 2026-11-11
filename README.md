# FitZone — Fitness & Wellness Platform

**FitZone** is a full-stack fitness and wellness platform designed to connect fitness enthusiasts, professional trainers, and administrators in one place. Members can explore fitness classes, book sessions, interact with the community, and manage their fitness journey. Trainers can create and manage classes, while administrators oversee the entire platform.

## Live Demo

- **Frontend:** [https://fitzone-eta-six.vercel.app]
- **Backend Repository:** [FitZone-server](https://github.com/tawsifulMostafa/Fitzone-server)

## Features

### Authentication & Authorization
- Secure authentication using Better Auth.
- Email and password authentication.
- Google social login.
- Role-based access control for Admins, Trainers, and Members.
- JWT-based API authentication.
- Protected routes and dashboard access.

### Fitness Classes
- Browse all available fitness classes.
- Explore classes by category and difficulty level.
- View class details, trainer information, schedules, and pricing.
- Trainers can create and manage fitness classes.
- Admins can approve or reject submitted classes.
- Discover popular classes based on booking activity.

### Member Dashboard
- View personal dashboard information.
- Manage booked fitness classes.
- Save favorite classes.
- Track trainer application status.
- Access personal fitness activities.

### Trainer Dashboard
- Create and manage fitness classes.
- View class booking information.
- Manage trainer-related activities.
- Access trainer-specific dashboard features.

### Admin Dashboard
- Monitor platform activities.
- Manage users and user roles.
- Manage fitness classes and approval requests.
- Review trainer applications.
- Manage trainers.
- Monitor payment transactions.
- Manage community forum posts.

### Community Forum
- Browse community discussions.
- Create forum posts.
- Like and dislike posts.
- Comment on discussions.
- Interact with other members.

### Payment Integration
- Secure payment processing with Stripe.
- Class booking and payment workflow.
- Payment history and transaction management.

## Technology Stack

| Category | Technologies |
|---|---|
| Framework | Next.js (App Router) |
| Library | React |
| Styling | Tailwind CSS |
| UI Components | HeroUI |
| Authentication | Better Auth |
| Database | MongoDB |
| API Communication | Fetch API |
| Backend | Express.js |
| Authentication Security | JWT, JOSE |
| Payment | Stripe |
| Notifications | Sonner |
| Animations | Framer Motion |
| Icons | Lucide React | 

## Project Structure Demo...

```text
src/
├── app/
│   ├── all-classes/
│   ├── community-forum/
│   ├── dashboard/
│   ├── signIn/
│   ├── signUp/
│   ├── layout.js
│   └── page.js
│
├── components/
│   ├── shared/
│   ├── home/
│   ├── classes/
│   ├── dashboard/
│   └── forum/
│
├── lib/
│   ├── api/
│   └── auth/
│
└── ...
```

*The structure above is illustrative; adjust it to match the actual repository.*

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS recommended)
- npm
- MongoDB database
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/tawsifulMostafa/Fitzone
```

**2. Navigate to the project directory**

```bash
cd fitZone
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8008

MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace the placeholder values with your actual credentials. Never commit environment variables or secret keys to GitHub.

**5. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint (if configured) |

## User Roles

| Role | Permissions |
|---|---|
| Member | Browse classes, book classes, manage favorites, participate in forums |
| Trainer | Create and manage classes, access trainer dashboard |
| Admin | Manage users, trainers, classes, applications, forums, and transactions |

## Backend

FitZone uses a separate Express.js backend to handle API requests, database operations, authentication verification, class management, bookings, payments, and community interactions.

**Backend Repository:** [tawsifulMostafa/Fitzone-server](https://github.com/tawsifulMostafa/Fitzone-server)

## Security

- Server-side authentication and protected API requests.
- JWT verification on the backend.
- Role-based authorization.
- User status verification.
- Secure payment verification through Stripe.
- Sensitive credentials managed through environment variables.

## Author

**Tawsiful Mostafa**

- GitHub: [@tawsifulMostafa](https://github.com/tawsifulMostafa)

---

**FitZone — Where Strength Meets Stillness.**