# How to Run Locally

## Prerequisites

Before running the app, you need:
1. ✅ Node.js installed (you have this)
2. ✅ npm installed (you have this)
3. ❌ MongoDB connection (you need to set this up)

## Quick Start

### Step 1: Setup MongoDB

You have 2 options:

**Option A: MongoDB Atlas (Recommended)**
- Follow the guide in `SETUP_MONGODB.md`
- Takes 5-10 minutes
- Free forever
- Required for Railway deployment anyway

**Option B: Install MongoDB Locally**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Step 2: Update .env File

After setting up MongoDB, update your `.env` file:

**For MongoDB Atlas:**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=taskflow_secret_key_2024_change_this_in_production
NODE_ENV=development
```

**For Local MongoDB:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=taskflow_secret_key_2024_change_this_in_production
NODE_ENV=development
```

### Step 3: Start the Backend

```bash
npm start
```

You should see:
```
Server running on port 5000
Database connected
```

### Step 4: Start the Frontend (New Terminal)

Open a new terminal window:

```bash
cd client
npm start
```

The React app will open at `http://localhost:3000`

## Testing the App

1. Go to `http://localhost:3000`
2. Click "Sign up"
3. Create an account:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123
   - Role: Admin
4. You'll be logged in automatically
5. Create a project
6. Add some tasks
7. Test all features!

## Common Issues

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check your connection string in `.env`
- For Atlas: verify IP whitelist includes 0.0.0.0/0

### "Port 5000 already in use"
- Change PORT in `.env` to 5001
- Update proxy in `client/package.json` to `http://localhost:5001`

### "Module not found"
```bash
# Reinstall dependencies
npm install
cd client && npm install
```

## Development Mode

For development with auto-reload:

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

## Production Build

To test the production build locally:

```bash
# Build frontend
npm run build

# Start server (serves built frontend)
npm start
```

Visit `http://localhost:5000`

## Next Steps

Once you've tested locally:
1. Push to GitHub
2. Deploy on Railway (follow `DEPLOYMENT.md`)
3. Record demo video (follow `DEMO_SCRIPT.md`)

## Need Help?

- MongoDB setup: `SETUP_MONGODB.md`
- Deployment: `DEPLOYMENT.md`
- Quick start: `QUICK_START.md`
- Main guide: `START_HERE.md`
