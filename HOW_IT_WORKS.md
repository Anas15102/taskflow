# How TaskFlow Works - User Guide

## 🎯 Understanding the App Flow

### 1. User Roles

**Admin Role:**
- Can create projects
- Can add/remove team members
- Can delete any task in their projects
- Full control over projects they create

**Member Role:**
- Can create projects
- Can create and manage tasks
- Can update task status
- Limited deletion rights (only own tasks)

## 📋 Dashboard Stats Explained

### Why Dashboard Shows Zero?

The dashboard shows **TASK** statistics, not project statistics:
- 📋 Total Tasks
- ⏳ To Do tasks
- 🔄 In Progress tasks
- ✓ Completed tasks
- ⚠️ Overdue tasks

**To see numbers on dashboard, you need to CREATE TASKS!**

## 🔄 Complete Workflow

### Step 1: Create a Project
1. Go to "Projects"
2. Click "New Project"
3. Enter project name and description
4. Click "Create Project"

**Result:** You are the only member (owner) of this project

### Step 2: Add Team Members (Optional)
1. Open the project
2. Click "Add Member" button
3. Search for users by name or email
4. Click "Add" next to their name

**Result:** Now they can see the project and collaborate

### Step 3: Create Tasks
1. Inside the project, click "New Task"
2. Fill in:
   - Task title (required)
   - Description (optional)
   - Assign to a team member
   - Set priority (Low/Medium/High)
   - Set due date (optional)
3. Click "Create Task"

**Result:** Task appears in the kanban board

### Step 4: Manage Tasks
- Drag tasks between columns OR
- Use the dropdown to change status:
  - To Do
  - In Progress
  - Completed

**Result:** Dashboard stats update automatically!

### Step 5: Check Dashboard
- Go to "Dashboard"
- See your task statistics
- View recent tasks
- Check for overdue tasks

## 🧪 Testing Scenario

### Scenario 1: Single User Testing

1. **Create Account** (Admin)
2. **Create Project:** "Website Redesign"
3. **Create Tasks:**
   - Task 1: "Design homepage" (High priority, assign to yourself)
   - Task 2: "Setup database" (Medium priority)
   - Task 3: "Write documentation" (Low priority)
4. **Update Status:**
   - Move "Design homepage" to "In Progress"
   - Move "Write documentation" to "Completed"
5. **Check Dashboard:**
   - Total Tasks: 3
   - To Do: 1
   - In Progress: 1
   - Completed: 1

### Scenario 2: Team Collaboration

**User 1 (Admin):**
1. Create project "Mobile App"
2. Click "Add Member"
3. Search for User 2's email
4. Add them to project

**User 2 (Member):**
1. Go to "Projects"
2. See "Mobile App" project (now visible!)
3. Open project
4. Create tasks
5. Assign tasks to User 1 or themselves

**Both Users:**
- Can see all tasks in the project
- Can update task status
- Dashboard shows their project's tasks

## ❓ Common Questions

### Q: Why can't other users see my project?
**A:** You need to add them as members! Projects are private by default.

### Q: Why is my dashboard showing zero?
**A:** You need to create TASKS within your projects. Projects alone don't show in stats.

### Q: Can members create projects?
**A:** Yes! Both admins and members can create projects. The creator becomes the owner.

### Q: How do I add someone to my project?
**A:** 
1. Open the project
2. Click "Add Member" (only if you're admin of that project)
3. Search and add them

### Q: What's the difference between admin and member?
**A:**
- **Project Level:** Admin can add/remove members, Member cannot
- **Task Level:** Admin can delete any task, Member can only delete their own
- **Creation:** Both can create projects and tasks

### Q: Why can't I see someone else's project?
**A:** They haven't added you as a member yet. Ask them to add you!

## 🎬 Demo Flow for Video

1. **Sign up** as Admin
2. **Create project** "E-commerce Platform"
3. **Create 3-4 tasks** with different priorities
4. **Update task statuses** (move some to In Progress, Complete one)
5. **Go to Dashboard** - Show the statistics (now they're not zero!)
6. **Show the kanban board** with tasks in different columns
7. **Highlight overdue tasks** (if you set past due dates)

## 💡 Pro Tips

- Set due dates to see overdue tracking in action
- Use different priorities to organize tasks
- Assign tasks to team members for collaboration
- Check dashboard regularly for overview
- Use the kanban board for visual task management

## 🐛 Not a Bug, It's a Feature!

- **Projects are private by default** - This is for security
- **Dashboard shows zero initially** - You need to create tasks first
- **Both roles can create projects** - This enables team collaboration
- **Members need to be added** - This prevents unauthorized access

## ✅ Quick Checklist for Testing

- [ ] Create a project
- [ ] Create at least 3 tasks in the project
- [ ] Set different priorities
- [ ] Set some due dates
- [ ] Move tasks between statuses
- [ ] Check dashboard (should show numbers now!)
- [ ] Create another user account
- [ ] Add them to your project
- [ ] Login as that user
- [ ] Verify they can see the project

---

**Everything is working as designed! The app is ready for deployment.** 🚀
