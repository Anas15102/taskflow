import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const allTasks = response.data;
      setTasks(allTasks);
      
      const now = new Date();
      const overdueTasks = allTasks.filter(task => 
        task.dueDate && new Date(task.dueDate) < now && task.status !== 'completed'
      );
      
      setStats({
        total: allTasks.length,
        todo: allTasks.filter(t => t.status === 'todo').length,
        inProgress: allTasks.filter(t => t.status === 'in-progress').length,
        completed: allTasks.filter(t => t.status === 'completed').length,
        overdue: overdueTasks.length
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'todo': 'badge-todo',
      'in-progress': 'badge-progress',
      'completed': 'badge-completed'
    };
    return badges[status] || 'badge-todo';
  };

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

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {user.name}!</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{background: '#e3f2fd'}}>
              <span style={{color: '#1976d2'}}>📋</span>
            </div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Tasks</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{background: '#fff3e0'}}>
              <span style={{color: '#f57c00'}}>⏳</span>
            </div>
            <div className="stat-info">
              <h3>{stats.todo}</h3>
              <p>To Do</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{background: '#f3e5f5'}}>
              <span style={{color: '#7b1fa2'}}>🔄</span>
            </div>
            <div className="stat-info">
              <h3>{stats.inProgress}</h3>
              <p>In Progress</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{background: '#e8f5e9'}}>
              <span style={{color: '#388e3c'}}>✓</span>
            </div>
            <div className="stat-info">
              <h3>{stats.completed}</h3>
              <p>Completed</p>
            </div>
          </div>

          {stats.overdue > 0 && (
            <div className="stat-card">
              <div className="stat-icon" style={{background: '#ffebee'}}>
                <span style={{color: '#c62828'}}>⚠️</span>
              </div>
              <div className="stat-info">
                <h3>{stats.overdue}</h3>
                <p>Overdue</p>
              </div>
            </div>
          )}
        </div>

        <div className="tasks-section">
          <div className="section-header">
            <h2>Recent Tasks</h2>
            <Link to="/projects" className="btn-secondary">View All Projects</Link>
          </div>

          {loading ? (
            <div className="loading-state">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Create a project to get started!</p>
              <Link to="/projects" className="btn-primary">Create Project</Link>
            </div>
          ) : (
            <div className="tasks-list">
              {tasks.slice(0, 10).map(task => (
                <div key={task._id} className={`task-item ${isOverdue(task) ? 'overdue' : ''}`}>
                  <div className="task-main">
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                    <div className="task-meta">
                      <span className="project-name">📁 {task.project?.name}</span>
                      {task.assignedTo && (
                        <span className="assignee">👤 {task.assignedTo.name}</span>
                      )}
                    </div>
                  </div>
                  <div className="task-details">
                    <span className={`badge ${getStatusBadge(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                    <span className={`badge ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`due-date ${isOverdue(task) ? 'overdue-text' : ''}`}>
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
