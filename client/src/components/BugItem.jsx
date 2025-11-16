import React, { useState } from 'react';

const BugItem = ({ bug, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(bug.status);

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    await onUpdate(bug._id, { status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      onDelete(bug._id);
    }
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  return (
    <div className={`bug-item ${getPriorityClass(bug.priority)}`}>
      <div className="bug-header">
        <h3>{bug.title}</h3>
        <span className={`badge ${getPriorityClass(bug.priority)}`}>
          {bug.priority}
        </span>
      </div>
      
      <p className="bug-description">{bug.description}</p>
      
      <div className="bug-meta">
        <span>Reported by: {bug.reportedBy}</span>
        <span>
          {new Date(bug.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <div className="bug-actions">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`status-select ${getStatusClass(status)}`}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        
        <button
          onClick={handleDelete}
          className="btn-delete"
          aria-label="Delete bug"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BugItem;
