import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './ProjectDetail.css';

function ProjectDetail({ user, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'todo',
    priority: 'medium',
    dueDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProject();
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProject(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/tasks?project=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };



  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/tasks', 
        { ...taskForm, project: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setShowTaskModal(false);
      setTaskForm({
        title: '',
        description: '',
        assignedTo: '',
        status: 'todo',
        priority: 'medium',
        dueDate: ''
      });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleTaskChange = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value
    });
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/tasks/${taskId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const searchUsers = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/users/search?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleAddMember = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/projects/${id}/members`,
        { userId, role: 'member' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setShowMemberModal(false);
      setSearchQuery('');
      setSearchResults([]);
      fetchProject();
    } catch (error) {
      console.error('Error adding member:', error);
      alert(error.response?.data?.message || 'Failed to add member');
    }
  };

  const isAdmin = project?.members.find(m => m.user._id === user.id)?.role === 'admin';

  const getPriorityBadge = (priority) => {
    const badges = {
      'low': 'badge-low',
      'medium': 'badge-medium',
      'high': 'badge-high'
    };
    return badges[priority] || 'badge-medium';
  };

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (task) => {
    if (!task.dueDate || task.status === 'completed') return false;
    return new Date(task.dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="project-detail">
        <Navbar user={user} onLogout={onLogout} />
        <div className="loading-state">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail">
        <Navbar user={user} onLogout={onLogout} />
        <div className="error-state">Project not found</div>
      </div>
    );
  }

  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    completed: tasks.filter(t => t.status === 'completed')
  };

  return (
    <div className="project-detail">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="project-detail-content">
        <div className="project-info">
          <div>
            <button className="back-btn" onClick={() => navigate('/projects')}>
              ← Back to Projects
            </button>
            <h1>{project.name}</h1>
            {project.description && <p>{project.description}</p>}
          </div>
          <div className="project-actions">
            {isAdmin && (
              <button className="btn-secondary" onClick={() => setShowMemberModal(true)}>
                + Add Member
              </button>
            )}
            <button className="btn-primary" onClick={() => setShowTaskModal(true)}>
              + New Task
            </button>
          </div>
        </div>

        <div className="project-members">
          <h3>Team Members ({project.members.length})</h3>
          <div className="members-list">
            {project.members.map(member => (
              <div key={member.user._id} className="member-item">
                <div className="member-avatar">
                  {member.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="member-info">
                  <span className="member-name">{member.user.name}</span>
                  <span className="member-email">{member.user.email}</span>
                </div>
                <span className={`role-badge ${member.role}`}>{member.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tasks-board">
          <h2>Tasks</h2>
          <div className="board-columns">
            {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
              <div key={status} className="board-column">
                <div className="column-header">
                  <h3>{status.replace('-', ' ')}</h3>
                  <span className="task-count">{statusTasks.length}</span>
                </div>
                <div className="column-tasks">
                  {statusTasks.map(task => (
                    <div key={task._id} className={`task-card ${isOverdue(task) ? 'overdue' : ''}`}>
                      <div className="task-card-header">
                        <h4>{task.title}</h4>
                        <button 
                          className="delete-task-btn"
                          onClick={() => handleDeleteTask(task._id)}
                          title="Delete task"
                        >
                          ×
                        </button>
                      </div>
                      {task.description && <p>{task.description}</p>}
                      <div className="task-card-meta">
                        <span className={`badge ${getPriorityBadge(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`due-date ${isOverdue(task) ? 'overdue-text' : ''}`}>
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                      {task.assignedTo && (
                        <div className="task-assignee">
                          <div className="assignee-avatar">
                            {task.assignedTo.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{task.assignedTo.name}</span>
                        </div>
                      )}
                      <select 
                        className="status-select"
                        value={task.status}
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Task</h2>
              <button className="close-btn" onClick={() => setShowTaskModal(false)}>×</button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleTaskSubmit}>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={taskForm.title}
                  onChange={handleTaskChange}
                  required
                  placeholder="Enter task title"
                />
              </div>
              
              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea
                  name="description"
                  value={taskForm.description}
                  onChange={handleTaskChange}
                  rows="3"
                  placeholder="Task details..."
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Assign To</label>
                  <select
                    name="assignedTo"
                    value={taskForm.assignedTo}
                    onChange={handleTaskChange}
                  >
                    <option value="">Unassigned</option>
                    {project.members.map(member => (
                      <option key={member.user._id} value={member.user._id}>
                        {member.user.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={taskForm.priority}
                    onChange={handleTaskChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Due Date (Optional)</label>
                <input
                  type="date"
                  name="dueDate"
                  value={taskForm.dueDate}
                  onChange={handleTaskChange}
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowTaskModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMemberModal && (
        <div className="modal-overlay" onClick={() => setShowMemberModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Team Member</h2>
              <button className="close-btn" onClick={() => setShowMemberModal(false)}>×</button>
            </div>
            
            <div className="search-section">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  searchUsers(e.target.value);
                }}
                className="search-input"
              />
              
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map(searchUser => {
                    const isMember = project.members.some(m => m.user._id === searchUser._id);
                    return (
                      <div key={searchUser._id} className="search-result-item">
                        <div>
                          <div className="result-name">{searchUser.name}</div>
                          <div className="result-email">{searchUser.email}</div>
                        </div>
                        {isMember ? (
                          <span className="already-member">Already a member</span>
                        ) : (
                          <button 
                            className="btn-add"
                            onClick={() => handleAddMember(searchUser._id)}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
