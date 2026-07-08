# EventCraft Backend API

Backend server for EventCraft - Express.js API with MySQL database.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure MySQL Database

Make sure MySQL is running on your system. You can use:
- XAMPP (includes MySQL and phpMyAdmin)
- WAMP
- Standalone MySQL Server

### 3. Create Database

Option A - Using MySQL Command Line:
```bash
mysql -u root -p < config/schema.sql
```

Option B - Using phpMyAdmin:
1. Open phpMyAdmin (http://localhost/phpmyadmin)
2. Click "Import" tab
3. Select `config/schema.sql` file
4. Click "Go"

### 4. Configure Environment Variables

The `.env` file is already created with default settings:
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD= (empty for XAMPP default)
- DB_NAME=eventcraft
- PORT=3000

If your MySQL has different settings, update the `.env` file.

### 5. Start Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/guest` - Create guest account
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `DELETE /api/auth/account` - Delete account
- `POST /api/auth/convert-guest` - Convert guest to user
- `POST /api/auth/logout` - Logout

### Events
- `POST /api/events` - Create event (with photo upload)
- `GET /api/events/:slug` - Get event by slug
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/duplicate` - Duplicate event
- `PUT /api/events/:id/favorite` - Toggle favorite
- `GET /api/events/:id/analytics` - Get analytics

### Dashboard
- `GET /api/dashboard/events` - Get user's events
- `GET /api/dashboard/analytics` - Get user analytics

### Admin (requires admin role)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/events` - Get all events
- `GET /api/admin/stats` - Get statistics
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/suspend` - Suspend/unsuspend user
- `DELETE /api/admin/users/:id` - Delete user
- `DELETE /api/admin/events/:id` - Delete event
- `POST /api/admin/events/bulk-delete` - Bulk delete events

## Default Admin Account

After running the schema.sql:
- Email: admin@eventcraft.com
- Password: admin123

**Important:** Change this password in production!

## File Uploads

Images are stored in the `backend/uploads` directory and served at `/uploads/:filename`.

## Troubleshooting

### Database Connection Failed
- Ensure MySQL is running
- Check credentials in `.env` file
- Verify database `eventcraft` exists
- Run `config/schema.sql` to create database

### Port Already in Use
- Change PORT in `.env` file
- Or stop the process using port 3000

### Upload Errors
- Ensure `uploads` directory exists and has write permissions
- Check file size (max 5MB per image)
- Only image files are allowed (jpeg, jpg, png, gif, webp)

## Development

To add new features:
1. Create route file in `routes/`
2. Add middleware if needed in `middleware/`
3. Register route in `server.js`
4. Update this README
