# TaskFlow - Team Task Manager

A web-based task management system for teams to collaborate on projects and track progress.

## Features

- User authentication with JWT
- Create and manage projects
- Add team members to projects
- Create tasks and assign them to team members
- Track task status (To Do, In Progress, Completed)
- Set task priorities and due dates
- Dashboard with task statistics
- Role-based permissions (Admin/Member)

## Tech Stack

**Frontend:** React, React Router, Axios  
**Backend:** Node.js, Express  
**Database:** MongoDB with Mongoose  
**Authentication:** JWT with bcrypt

## Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repo
```bash
git clone <your-repo-url>
cd team-task-manager
```

2. Install dependencies
```bash
npm install
cd client && npm install
```

3. Create `.env` file in root directory
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production
```

4. Build the frontend
```bash
npm run build
```

5. Start the server
```bash
npm start
```

The app will run on `http://localhost:5000`

## Development

Run backend and frontend separately:

```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend  
cd client
npm start
```

## Deployment

### MongoDB Setup
1. Create a free cluster on MongoDB Atlas
2. Create a database user
3. Whitelist all IPs (0.0.0.0/0)
4. Copy the connection string

### Railway Deployment
1. Push code to GitHub
2. Create new project on Railway
3. Connect your GitHub repo
4. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
5. Deploy

## Usage

1. Sign up for an account
2. Create a project
3. Add team members (search by email)
4. Create tasks within the project
5. Assign tasks and set priorities
6. Update task status as you progress
7. Check dashboard for overview

## API Endpoints

### Auth
- POST `/api/auth/signup` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user

### Projects
- GET `/api/projects` - Get user's projects
- POST `/api/projects` - Create project
- GET `/api/projects/:id` - Get project details
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project
- POST `/api/projects/:id/members` - Add member

### Tasks
- GET `/api/tasks` - Get tasks
- POST `/api/tasks` - Create task
- GET `/api/tasks/:id` - Get task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

### Users
- GET `/api/users` - Get all users
- GET `/api/users/search` - Search users

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   └── App.js
│   └── package.json
├── models/              # Mongoose models
├── routes/              # Express routes
├── middleware/          # Auth middleware
├── server.js           # Express server
└── package.json
```

## Notes

- Projects are private by default - add members to share
- Dashboard shows task statistics (create tasks to see numbers)
- Both admins and members can create projects
- Admins have full control over their projects
- Members can create and manage tasks

## License

MIT
