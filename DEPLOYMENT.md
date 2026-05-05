# Deployment Guide for Railway

## Prerequisites
1. GitHub account
2. Railway account (sign up at https://railway.app)
3. MongoDB Atlas account (for database)

## Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist all IP addresses (0.0.0.0/0) for Railway access
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/taskmanager`)

## Step 2: Push to GitHub

```bash
# If you haven't already, initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy on Railway

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will automatically detect it's a Node.js app

## Step 4: Add Environment Variables

In Railway dashboard, go to your project and add these variables:

```
MONGODB_URI=your_mongodb_connection_string_from_atlas
JWT_SECRET=your_random_secret_key_here
NODE_ENV=production
PORT=5000
```

To generate a secure JWT_SECRET, you can use:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 5: Deploy

Railway will automatically deploy your app. Wait for the build to complete.

## Step 6: Get Your URL

1. In Railway dashboard, click on your project
2. Go to Settings
3. Click "Generate Domain" to get a public URL
4. Your app will be live at: `https://your-app-name.up.railway.app`

## Testing Your Deployment

1. Visit your Railway URL
2. Sign up for a new account
3. Create a project
4. Add tasks
5. Test all features

## Troubleshooting

### Build Fails
- Check the build logs in Railway dashboard
- Ensure all dependencies are in package.json
- Verify MongoDB connection string is correct

### App Crashes
- Check the deployment logs
- Verify environment variables are set correctly
- Ensure MongoDB Atlas allows connections from all IPs

### Can't Connect to Database
- Verify MongoDB connection string format
- Check if IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions

## Updating Your App

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Railway will automatically redeploy your app.

## Demo Video Tips

Record a 2-5 minute video showing:
1. User signup/login
2. Creating a project
3. Adding team members
4. Creating and assigning tasks
5. Updating task status
6. Dashboard overview with stats
7. Role-based access (admin vs member)

Use screen recording software like:
- OBS Studio (free)
- Loom (free tier available)
- QuickTime (Mac)
- Windows Game Bar (Windows)
