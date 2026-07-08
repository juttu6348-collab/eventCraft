# EventCraft - Event Management Platform

Create beautiful, personalized celebration pages for birthdays, weddings, anniversaries, and more!

## 🎉 About EventCraft

EventCraft is a comprehensive web-based event management platform that allows users to create, customize, and share personalized celebration pages. Built with modern web technologies, it provides an intuitive interface for crafting memorable digital experiences.

## 🏗️ Technology Stack

**Backend:**
- Node.js + Express.js
- MySQL Database
- JWT Authentication
- Bcrypt Password Hashing
- Multer File Upload
- CORS Enabled

**Frontend:**
- React 19.0.0
- Vite Build Tool
- React Router DOM
- Axios for API calls
- Bootstrap 5 + React Bootstrap
- SASS for styling
- Framer Motion animations

## 🌟 Features

- **User Authentication** - Secure registration and login with JWT tokens
- **Guest Mode** - Try the platform without creating an account
- **Event Creation** - Multiple event types (Birthday, Wedding, Anniversary, etc.)
- **Custom Themes** - Beautiful pre-designed themes and color schemes
- **Photo Galleries** - Upload and organize event photos
- **Event Microsite** - Each event gets a unique, shareable URL
- **User Dashboard** - Manage all your events in one place
- **Admin Panel** - Platform administration and user management
- **Analytics** - Track event views and engagement
- **Responsive Design** - Works perfectly on all devices

## 📁 Project Structure

```
EventCraft/
├── backend/              # Node.js/Express API Server
│   ├── config/          # Database config & schema
│   ├── middleware/      # Auth & upload middleware
│   ├── routes/          # API routes
│   ├── uploads/         # Image storage
│   └── server.js        # Main server file
├── src/                 # React Frontend
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── context/        # React Context (Auth)
│   ├── services/       # API service layer
│   └── utils/          # Utility functions
└── public/             # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- npm package manager

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd EventCraft
```

**2. Install dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

**3. Setup MySQL Database**

Using XAMPP/WAMP:
1. Start MySQL server
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Import `backend/config/schema.sql`

Or using command line:
```bash
mysql -u root -p < backend/config/schema.sql
```

Backend configuration is in `backend/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=eventcraft
PORT=3000
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:5173
```

Frontend configuration is in `.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

**5. Start the Application**

Terminal 1 - Backend:
```bash
cd backend
npm start
```

Terminal 2 - Frontend:
```bash
npm run dev
```

**6. Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api
- API Health Check: http://localhost:3000/api/health

**Admin Account:**
- Email: admin@eventcraft.com
- Password: admin123

## � API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/guest` - Guest login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `DELETE /api/auth/account` - Delete account
- `POST /api/auth/convert-guest` - Convert guest to user
- `POST /api/auth/logout` - Logout

### Events
- `POST /api/events` - Create event (with images)
- `GET /api/events/:slug` - Get event by slug
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/duplicate` - Duplicate event
- `PUT /api/events/:id/favorite` - Toggle favorite
- `GET /api/events/:id/analytics` - Get event analytics

### Dashboard
- `GET /api/dashboard/events` - Get user's events
- `GET /api/dashboard/analytics` - Get user analytics

### Admin (Requires admin role)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/events` - Get all events
- `GET /api/admin/stats` - Get platform statistics
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/suspend` - Suspend/unsuspend user
- `DELETE /api/admin/users/:id` - Delete user
- `DELETE /api/admin/events/:id` - Delete event
- `POST /api/admin/events/bulk-delete` - Bulk delete events

## �️ Database Schema

### Tables
- **users** - User accounts and authentication
- **events** - Event information and configuration
- **event_photos** - Photo gallery for events
- **event_stats** - View and engagement tracking
- **custom_pages** - Custom content pages

All tables use InnoDB engine with proper foreign key constraints and indexes for optimal performance.

## 🎨 Event Types

- Birthday
- Wedding
- Anniversary
- Graduation
- Baby Shower
- Engagement
- Holiday Celebration
- Custom Events

## 🔧 Development

### Building for Production

Frontend:
```bash
npm run build
```

Backend:
```bash
# Set NODE_ENV=production in .env
npm start
```

### Linting
```bash
npm run lint
```

## 📝 Documentation

- [Project Report](PROJECT_REPORT.md) - Complete project documentation
- [Backend README](backend/README.md) - Backend API documentation

## 🛡️ Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Server-side validation
- **File Upload Restrictions** - Type and size limits
- **CORS Protection** - Configured allowed origins
- **SQL Injection Prevention** - Parameterized queries

## 🐛 Troubleshooting

**Database Connection Failed:**
- Ensure MySQL is running
- Verify credentials in `backend/.env`
- Check if `eventcraft` database exists

**Port Already in Use:**
- Change PORT in `backend/.env`
- Update VITE_API_URL in frontend `.env`

**CORS Errors:**
- Backend CORS is configured for ports 5173 and 5174
- Check FRONTEND_URL in `backend/.env`

## � Team

- **Muhammad Jawad Rehmat Qureshi** (3323)
- **Muhammad Usman** (3288)
- **Hamza Saeed** (3321)

## 📄 License

This project is developed as part of academic coursework.

## 🙏 Acknowledgments

- React Team for the amazing framework
- Express.js community
- MySQL developers
- All open-source contributors

---

**Built by Team EventCraft**
