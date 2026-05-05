# Deployment Guide

## MongoDB Setup

1. Go to mongodb.com/cloud/atlas and create a free account
2. Create a new cluster (free tier M0)
3. Create a database user with username and password
4. Under Network Access, add IP address 0.0.0.0/0 (allows access from anywhere)
5. Click Connect > Connect your application
6. Copy the connection string and replace <password> with your actual password

Your connection string should look like:
```
mongodb+srv://username:password@cluster.mongodb.net/taskmanager
```

## Railway Deployment

1. Push your code to GitHub
2. Go to railway.app and sign in with GitHub
3. Click "New Project" > "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables:
   - `MONGODB_URI` - your MongoDB connection string
   - `JWT_SECRET` - any random string (use a password generator)
   - `NODE_ENV` - set to `production`
6. Go to Settings > Generate Domain
7. Wait for deployment to complete

Your app will be live at the generated Railway URL.

## Testing

After deployment:
1. Visit your Railway URL
2. Sign up for an account
3. Create a project
4. Add some tasks
5. Test all features

## Troubleshooting

**Build fails:**
- Check if all environment variables are set correctly
- Verify MongoDB connection string format

**Can't connect to database:**
- Make sure IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
- Check if password in connection string is correct

**App crashes:**
- Check Railway logs for errors
- Verify JWT_SECRET is set
