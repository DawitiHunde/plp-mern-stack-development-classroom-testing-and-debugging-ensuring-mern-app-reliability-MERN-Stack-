import React from 'react';
import './BugItem.css';

const BugItem = ({ bug, onUpdate, onDelete }) => {
  const handleStatusChange = (e) => {
    onUpdate(bug._id, { status: e.target.value });
  };

  const handleDelete = () => {
    onDelete(bug._id);
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const getPriorityClass = (priority) => {
    return `priority-badge priority-${priority}`;
  };

  return (
    <div className="bug-item">
      <div className="bug-header">
        <h3>{bug.title}</h3>
        <div className="bug-badges">
          <span className={getPriorityClass(bug.priority)}>
            {bug.priority}
          </span>
          <span className={getStatusClass(bug.status)}>
            {bug.status}
          </span>
        </div>
      </div>

      <p className="bug-description">{bug.description}</p>

      <div className="bug-meta">
        <span>Reported by: <strong>{bug.reportedBy}</strong></span>
        <span>Created: {new Date(bug.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="bug-actions">
        <select 
          value={bug.status} 
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BugItem;
