# EventCraft

**EventCraft** is a full-stack event and digital celebration platform for creating, managing, and sharing personalized event microsites for birthdays, weddings, anniversaries, graduations, engagements, baby showers, and other special occasions.

**Live application:** https://event-craft-pvmq.vercel.app  
**API health check:** https://event-craft-pvmq.vercel.app/api/health  
**Repository:** https://github.com/juttu6348-collab/eventCraft

---

## Table of Contents

- [Overview](#overview)
- [Current Status](#current-status)
- [Core Features](#core-features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Production Deployment](#production-deployment)
- [API Reference](#api-reference)
- [Database Model](#database-model)
- [Security](#security)
- [Image Uploads](#image-uploads)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Known Limitations](#known-limitations)
- [Recommended Next Improvements](#recommended-next-improvements)
- [Team](#team)
- [License](#license)

---

## Overview

EventCraft allows users to create unique and shareable digital event pages with personalized messages, themes, event details, photo galleries, and optional custom content.

The application includes:

- A public marketing website
- Email/password authentication
- Guest access
- A protected user dashboard
- Event creation and management
- Public event microsites
- Event analytics
- An administrative dashboard
- Role-based access control

The frontend and backend are maintained in the same repository and are deployed through Vercel as separate services connected by `/api` rewrites.

---

## Current Status

EventCraft is deployed and operational in production.

| Component | Status |
|---|---|
| React frontend | Deployed |
| Express API | Deployed |
| TiDB Cloud database | Connected |
| Authentication | Working |
| Dynamic CORS | Configured |
| Admin authorization | Implemented |
| Vercel service routing | Configured |
| API health endpoint | Available |

---

## Core Features

### Authentication and Accounts

- User registration with email, password, and display name
- Secure email/password login
- Password hashing with bcrypt
- JWT-based authentication
- Seven-day JWT expiration
- Guest account creation
- Guest-to-user account conversion
- Current-user profile retrieval
- Display name and profile photo URL updates
- Account deletion
- Client-side logout
- Suspended-account login protection
- Automatic handling of unauthorized API responses

### Event Creation and Management

- Create personalized events
- Generate unique, shareable event slugs
- Support multiple event types
- Set sender and receiver names
- Add relationship information
- Set an event date
- Add a personalized message
- Choose a visual theme
- Configure enabled event pages
- Add optional custom-page content
- Upload multiple event images
- View public event microsites
- Edit owned events
- Delete owned events
- Duplicate existing events
- Mark events as favorites
- Track event views and shares
- View per-event analytics

### User Dashboard

- View all events created by the authenticated user
- Display total event and view statistics
- Identify the most-viewed event
- Search and filter events through the dashboard interface
- Switch between supported dashboard views
- Duplicate, favorite, or delete events
- Access event analytics and sharing options

### Admin Panel

- Admin-only protected routes
- View platform statistics
- View all users
- View all events
- Change user roles
- Suspend or reactivate users
- Delete users
- Delete events
- Bulk-delete selected events
- Prevent an administrator from deleting their own account through the admin endpoint
- Review user, guest, administrator, event, and view totals

### User Experience

- Responsive layout
- Public home, about, themes, events, and how-it-works pages
- Light and dark interface support
- React-based toast notifications
- Animated UI elements
- Shareable event links
- QR-code support
- Protected user and admin routes
- Single-page application routing

---

## Architecture

```text
User Browser
     |
     v
Vercel Frontend Service
React 19 + Vite
     |
     | /api/*
     v
Vercel Backend Service
Node.js + Express
     |
     v
TiDB Cloud
MySQL-compatible database
```

### Request Flow

1. The React frontend sends requests to `/api`.
2. Vercel rewrites `/api/*` requests to the backend service.
3. The Express backend validates authentication and authorization.
4. The backend executes parameterized SQL queries through `mysql2`.
5. The API returns JSON responses to the frontend.

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19.2 | User interface |
| React DOM 19.2 | Browser rendering |
| Vite 7.2 | Development and production builds |
| React Router DOM 7.10 | Client-side routing |
| Axios | API requests |
| Bootstrap 5.3 | Base UI framework |
| React Bootstrap | React UI components |
| SASS and CSS | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| React Hot Toast | Notifications |
| Recharts | Charts and analytics |
| QRCode React | QR-code generation |
| date-fns | Date utilities |
| React Confetti | Celebration effects |

### Backend

| Technology | Purpose |
|---|---|
| Node.js 22 | JavaScript runtime |
| Express 4 | REST API |
| mysql2 | TiDB/MySQL connection pooling and queries |
| JSON Web Token | Authentication |
| bcryptjs | Password hashing |
| Multer | Multipart image uploads |
| Helmet | Security headers |
| CORS | Origin control |
| express-rate-limit | Authentication rate limiting |
| express-validator | Request-validation support |
| dotenv | Environment configuration |
| Cloudinary SDK | Installed for cloud-media integration |

### Infrastructure

| Service | Purpose |
|---|---|
| Vercel | Frontend and backend deployment |
| Vercel Services | Monorepo service routing |
| TiDB Cloud | Production relational database |
| GitHub | Source control |

---

## Project Structure

```text
EventCraft/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── schema.sql
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── dashboard.js
│   │   └── admin.js
│   ├── uploads/
│   ├── package.json
│   └── server.js
├── public/
├── screenshots/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   │   └── Admin/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── vercel.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

Install the following:

- Node.js 22.x
- npm
- Git
- A MySQL-compatible database:
  - TiDB Cloud for hosted development or production
  - MySQL 8 for local development

Check the installed versions:

```bash
node --version
npm --version
git --version
```

### Clone the Repository

```bash
git clone https://github.com/juttu6348-collab/eventCraft.git
cd eventCraft
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Cloudinary Variables

The Cloudinary SDK is installed, but the current upload middleware still writes files to local disk. When Cloudinary storage is connected, use environment variables such as:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Do not expose `CLOUDINARY_API_SECRET` in frontend code.

---

## Database Setup

EventCraft uses a MySQL-compatible relational schema with the following primary tables:

- `users`
- `events`
- `event_photos`
- `event_stats`
- `custom_pages`

### Important Schema Warning

The current `backend/config/schema.sql` file contains destructive database statements, including:

```sql
DROP DATABASE IF EXISTS eventcraft;
```

Do not run this file against a production database or any database containing important data.

Use it only for a new local development database after reviewing the full script.

### Local Database Initialization

Using the MySQL command line:

```bash
mysql -u root -p < backend/config/schema.sql
```

Or import the schema through MySQL Workbench or phpMyAdmin.

### TiDB Cloud

For production:

1. Create or select a TiDB Cloud cluster.
2. Add the required IP or network access rules.
3. Create the `eventcraft` database and required tables.
4. Add the TiDB connection values to Vercel environment variables.
5. Redeploy after changing environment variables.
6. Verify the connection through the API health and authentication endpoints.

## Running Locally

### Start the Backend

Open the first terminal:

```bash
cd backend
npm start
```

For development with automatic restart:

```bash
cd backend
npm run dev
```

The backend runs by default at:

```text
http://localhost:3000
```

### Start the Frontend

Open a second terminal from the project root:

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

### Verify the API

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "OK",
  "message": "EventCraft API is running"
}
```

---

## Production Deployment

EventCraft uses `vercel.json` to deploy the frontend and backend as separate services in the same Vercel project.

### Service Configuration

- Frontend root: `.`
- Frontend framework: Vite
- Backend root: `backend`
- Backend framework: Express
- Backend entry point: `server.js`
- `/api/*` requests are routed to the backend
- All other requests are routed to the frontend
- Frontend routes are rewritten to `index.html`

### Deployment Steps

1. Push the latest code to the `main` branch.
2. Connect the GitHub repository to Vercel.
3. Add all production environment variables.
4. Confirm `VITE_API_URL=/api`.
5. Deploy the project.
6. Wait for the deployment status to become `Ready`.
7. Verify the health endpoint.
8. Test registration, login, event creation, dashboard access, and admin authorization.

### Production Verification

```bash
curl -i https://event-craft-pvmq.vercel.app/api/health
```

Test login without exposing credentials in shared logs:

```bash
curl -i -X POST \
  "https://event-craft-pvmq.vercel.app/api/auth/login" \
  -H "Origin: https://event-craft-pvmq.vercel.app" \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","password":"your-password"}'
```

A successful response should return `200 OK` with a user object and JWT token.

Never paste a real production JWT token into public documentation or support messages.

---

## API Reference

Base URL:

```text
/api
```

Protected endpoints require:

```http
Authorization: Bearer <jwt-token>
```

### Health

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/health` | Public | Check API availability |

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Log in with email and password |
| POST | `/api/auth/guest` | Public | Create a guest account |
| GET | `/api/auth/me` | Authenticated | Get the current user |
| PUT | `/api/auth/profile` | Authenticated | Update profile information |
| DELETE | `/api/auth/account` | Authenticated | Delete the current account |
| POST | `/api/auth/convert-guest` | Guest | Convert a guest into a user |
| POST | `/api/auth/logout` | Authenticated | Log out on the client |

### Events

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/events` | Authenticated | Create an event with optional images |
| GET | `/api/events/:slug` | Public | Get an event by its slug |
| PUT | `/api/events/:id` | Owner/Admin | Update an event |
| DELETE | `/api/events/:id` | Owner/Admin | Delete an event |
| POST | `/api/events/:id/duplicate` | Owner | Duplicate an event |
| PUT | `/api/events/:id/favorite` | Owner | Change favorite status |
| GET | `/api/events/:id/analytics` | Authenticated | Get event analytics |

### Dashboard

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/dashboard/events` | Authenticated | Get the user's events |
| GET | `/api/dashboard/analytics` | Authenticated | Get user-level analytics |

### Admin

All admin routes require a valid JWT with the `admin` role.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/events` | Get all events |
| GET | `/api/admin/stats` | Get platform statistics |
| PUT | `/api/admin/users/:id/role` | Update a user's role |
| PUT | `/api/admin/users/:id/suspend` | Suspend or reactivate a user |
| DELETE | `/api/admin/users/:id` | Delete a user |
| DELETE | `/api/admin/events/:id` | Delete an event |
| POST | `/api/admin/events/bulk-delete` | Delete multiple events |

---

## Database Model

### `users`

Stores:

- Email
- Password hash
- Display name
- Profile photo URL
- Role
- Account status
- Creation date
- Last login
- Guest conversion status
- Anonymous-account flag

Supported roles:

```text
user
guest
admin
```

Supported statuses:

```text
active
suspended
```

### `events`

Stores:

- Unique slug
- Event type
- Sender name
- Receiver name
- Relationship
- Event date
- Main message
- Theme
- Enabled pages
- Owner
- Favorite state
- Created and updated timestamps

### `event_photos`

Stores event image references and display order.

### `event_stats`

Stores event views, shares, and last-viewed time.

### `custom_pages`

Stores optional custom page titles and body content.

### Relationships

```text
users 1 ─── N events
events 1 ─── N event_photos
events 1 ─── 1 event_stats
events 1 ─── N custom_pages
```

Foreign keys and cascade rules protect relational consistency when events are deleted.

---

## Security

The current application includes:

- bcrypt password hashing
- JWT signature validation
- Seven-day access-token expiration
- Role-based admin middleware
- Owner checks for event updates and deletion
- Account suspension checks
- Parameterized SQL queries
- Helmet security headers
- Dynamic CORS validation
- Authentication rate limiting
- Image type validation
- Five-megabyte image size limit
- `.env` exclusion through `.gitignore`

### Authentication Rate Limit

Authentication routes are limited to:

```text
50 requests per 15 minutes
```

### Production Security Checklist

Before every production release:

- Rotate any exposed password
- Rotate an exposed JWT secret
- Verify no secrets exist in Git history
- Restrict TiDB network access
- Use different secrets for development and production
- Use a long, random JWT secret
- Test normal-user and admin authorization separately
- Review runtime logs without printing passwords or tokens
- Confirm production environment variables are applied to the correct Vercel environment

---

## Image Uploads

The current backend accepts:

- JPEG
- JPG
- PNG
- GIF
- WebP

Limits:

- Up to 10 images per event
- Maximum 5 MB per image

### Production Storage Notice

The current `upload.js` middleware uses local disk storage under:

```text
backend/uploads
```

Local disk uploads are suitable for local development, but they should not be treated as permanent production storage in a serverless deployment.

For reliable production uploads:

1. Connect the existing Cloudinary SDK or another object-storage provider.
2. Upload images directly to cloud storage.
3. Save the returned secure URL in `event_photos.photo_url`.
4. Delete the cloud asset when its event or photo is deleted.
5. Validate file type, size, and upload ownership on the backend.

---

## Testing

### Available Commands

Frontend development:

```bash
npm run dev
```

Frontend production build:

```bash
npm run build
```

Frontend linting:

```bash
npm run lint
```

Frontend production preview:

```bash
npm run preview
```

Backend development:

```bash
cd backend
npm run dev
```

Backend production start:

```bash
cd backend
npm start
```

### Production Smoke Test

Test these flows after every deployment:

1. Open the public home page.
2. Register a new test user.
3. Log in with valid credentials.
4. Verify invalid-login handling.
5. Create an event.
6. Open the public event URL.
7. Edit the event.
8. Duplicate the event.
9. Favorite and unfavorite the event.
10. Review dashboard analytics.
11. Delete a test event.
12. Log in as an administrator.
13. Verify user and event management.
14. Confirm a normal user cannot open admin routes.
15. Test on desktop and mobile.
16. Refresh important routes directly.
17. Review Vercel runtime logs for unexpected errors.

---

## Troubleshooting

### API Health Check Fails

Run:

```bash
curl -i https://event-craft-pvmq.vercel.app/api/health
```

Then check:

- Latest deployment is `Ready`
- Backend service entry point is `server.js`
- `/api/*` rewrite targets the backend service
- Production environment variables are configured
- Vercel runtime logs contain no startup error

### Login Returns `500`

Check Vercel runtime logs for the backend exception.

Common causes include:

- Incorrect TiDB credentials
- Missing `JWT_SECRET`
- Missing database tables or columns
- Database network restrictions
- SQL errors
- Production environment variables not applied
- Deployment not redeployed after changing environment variables

### Login Returns `401`

A JSON response such as:

```json
{
  "error": "Invalid credentials"
}
```

normally means the user was not found or the password did not match.

A Vercel response containing a cookie similar to `_vercel_sso_nonce` may indicate Vercel Deployment Protection intercepted the request before it reached EventCraft.

### CORS Error

Confirm `FRONTEND_URLS` contains the exact frontend origins:

```env
FRONTEND_URLS=https://event-craft-pvmq.vercel.app,http://localhost:5173
```

Do not include unnecessary paths such as `/login` or `/api`.

After changing a Vercel environment variable, redeploy the application.

### Database Connection Failure

Check:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- SSL requirements
- TiDB allow-list or connection settings
- Whether the correct Vercel environment was updated

Never print the database password in logs.

### Direct Frontend Route Returns `404`

Confirm the frontend service rewrites routes to:

```text
/index.html
```

This is required for React Router routes opened directly in the browser.

### `dotenv` Cannot Be Found

Run backend commands from the backend directory:

```bash
cd backend
npm install
node server.js
```

### Port Already in Use

On Windows:

```cmd
taskkill /F /T /IM node.exe
```

Or change the backend `PORT`.

---

## Known Limitations

The following items are not fully implemented in the current codebase:

- Password-reset email flow
- Google sign-in
- Refresh-token rotation
- Server-side JWT revocation
- Persistent production media storage through Cloudinary
- Automated frontend and backend test suites
- Continuous integration pipeline
- Email invitations and notifications
- Advanced audit logging
- Advanced analytics exports

The logout endpoint confirms logout, but the current authentication model relies on removing the JWT from the client.

---

## Recommended Next Improvements

Recommended implementation order:

1. Replace local image storage with Cloudinary
2. Add password reset and email verification
3. Add automated API and frontend tests
4. Add structured production logging and monitoring
5. Add refresh-token rotation and session revocation
6. Add validation consistently with `express-validator`
7. Add database migrations instead of destructive schema initialization
8. Add CI checks for build, lint, and tests
9. Add event invitations and email notifications
10. Add audit logs for administrator actions


## License

The backend package currently declares the ISC license.

The project was originally developed as part of academic coursework. Confirm the intended repository-wide license before public distribution or commercial reuse.

---

## Acknowledgments

- React
- Vite
- Express
- TiDB
- MySQL
- Vercel
- Bootstrap
- All open-source contributors

---

**Built by Team EventCraft**
