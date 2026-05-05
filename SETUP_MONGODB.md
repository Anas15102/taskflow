# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free & Required for Railway)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or Google

### Step 2: Create Cluster
1. Choose "FREE" tier (M0)
2. Select a cloud provider (AWS recommended)
3. Choose a region close to you
4. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `taskmanager`
5. Password: Create a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Allow Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. This adds `0.0.0.0/0` (required for Railway)
5. Click "Confirm"

### Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It looks like: `mongodb+srv://taskmanager:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 6: Update .env File
Replace the MONGODB_URI in your `.env` file:

```
MONGODB_URI=mongodb+srv://taskmanager:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

**Important:** 
- Replace `<password>` with your actual password
- Add `/taskmanager` before the `?` to specify the database name

### Step 7: Test Connection
```bash
npm start
```

You should see: "Database connected"

---

## Option 2: Local MongoDB (For Testing Only)

### macOS Installation
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify it's running
brew services list
```

### Your .env for Local MongoDB
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=taskflow_secret_key_2024_change_this_in_production
NODE_ENV=development
```

---

## Quick Test

After setting up MongoDB, test your connection:

```bash
# Start the server
npm start

# You should see:
# Server running on port 5000
# Database connected
```

If you see "Database connected", you're ready to go! 🎉

---

## Troubleshooting

### "MongooseServerSelectionError"
- Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify your password is correct in the connection string
- Make sure you replaced `<password>` with actual password

### "Authentication failed"
- Double-check username and password
- Make sure database user has correct permissions

### "Network timeout"
- Check your internet connection
- Verify the cluster is running in MongoDB Atlas

---

## For Railway Deployment

You MUST use MongoDB Atlas (Option 1) for Railway deployment.
Local MongoDB won't work on Railway.

Save your MongoDB Atlas connection string - you'll need it for Railway environment variables!
