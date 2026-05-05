# Quick Start Guide

## 🚀 Get Your App Live in 15 Minutes

### Step 1: Setup MongoDB (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Create a FREE cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. In "Network Access", add IP: `0.0.0.0/0` (allow all)

**Your connection string should look like:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

### Step 2: Push to GitHub (3 minutes)

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Railway (5 minutes)

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Click on the project → "Variables" tab
6. Add these environment variables:

```
MONGODB_URI=your_mongodb_connection_string_from_step1
JWT_SECRET=any_random_long_string_here
NODE_ENV=production
```

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

7. Go to "Settings" → "Generate Domain"
8. Wait 2-3 minutes for deployment to complete

### Step 4: Test Your App (2 minutes)

1. Visit your Railway URL
2. Click "Sign up"
3. Create an account
4. Create a project
5. Add a task
6. Done! 🎉

## 📹 Record Demo Video

Use the `DEMO_SCRIPT.md` file for guidance. Record with:
- **Loom** (easiest): https://loom.com
- **OBS Studio** (free): https://obsproject.com
- **QuickTime** (Mac): Built-in screen recording

## 📤 Submit

You need to submit:
1. ✅ Live Railway URL
2. ✅ GitHub repository URL
3. ✅ Demo video link (YouTube/Loom)

## ⚠️ Common Issues

**Build fails on Railway?**
- Check if MongoDB connection string is correct
- Verify all environment variables are set

**Can't connect to database?**
- Make sure IP whitelist includes 0.0.0.0/0
- Check if database user has correct permissions

**App crashes after deployment?**
- Check Railway logs for errors
- Verify JWT_SECRET is set

## 🎯 Features to Show in Demo

1. User signup/login
2. Create project
3. Add team members
4. Create tasks with assignments
5. Update task status (drag or dropdown)
6. Dashboard with statistics
7. Role-based access (admin vs member)
8. Overdue task tracking

## 💡 Pro Tips

- Use a professional email for signup in demo
- Create meaningful project/task names
- Show the kanban board clearly
- Mention the tech stack (MERN)
- Keep video under 5 minutes
- Test everything before recording

## 🔗 Useful Links

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Railway](https://railway.app)
- [GitHub](https://github.com)
- [Loom](https://loom.com)

## Need Help?

Check these files:
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Detailed deployment guide
- `DEMO_SCRIPT.md` - Video recording script
- `SUBMISSION_CHECKLIST.md` - Final checklist

---

**You're all set! Good luck with your submission! 🚀**
