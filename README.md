# TaskFlow - Team Task Manager

A full-stack web application for team collaboration and task management with role-based access control.

## Features

- **User Authentication**: Secure signup and login system
- **Project Management**: Create and manage multiple projects
- **Team Collaboration**: Add team members to projects with role-based permissions (Admin/Member)
- **Task Management**: Create, assign, and track tasks with status updates
- **Dashboard**: Overview of all tasks with status tracking and overdue alerts
- **Role-Based Access**: Different permissions for admins and members
- **Real-time Updates**: Track task progress with visual kanban board

## Tech Stack

**Frontend:**
- React.js
- React Router for navigation
- Axios for API calls
- CSS3 for styling

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database (local or cloud)

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd team-task-manager
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

4. Create a `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
NODE_ENV=production
```

5. Build the frontend:
```bash
npm run build
```

6. Start the application:
```bash
npm start
```

The app will be available at `http://localhost:5000`

## Development Mode

To run in development mode with hot reload:

```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

## Deployment on Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables in Railway dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Railway will automatically detect and deploy your app

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member to project

### Tasks
- `GET /api/tasks` - Get all tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Users
- `GET /api/users` - Get all users
- `GET /api/users/search` - Search users

## Usage

1. **Sign Up**: Create an account with your name, email, and password
2. **Create Project**: Start a new project and add team members
3. **Add Tasks**: Create tasks, assign them to team members, set priorities and due dates
4. **Track Progress**: Use the kanban board to move tasks through different stages
5. **Monitor Dashboard**: View all your tasks and identify overdue items

## Project Structure

```
team-task-manager/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── App.js
│       └── index.js
├── models/                 # MongoDB models
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── routes/                 # API routes
│   ├── auth.js
│   ├── projects.js
│   ├── tasks.js
│   └── users.js
├── middleware/             # Custom middleware
│   ├── auth.js
│   └── admin.js
├── server.js              # Express server
├── package.json
└── README.md
```

## License

MIT

## Author

Built for team collaboration and productivity
