import React from 'react';
import BugItem from './BugItem';

const BugList = ({ bugs, onUpdate, onDelete, loading, error }) => {
  if (loading) {
    return <div className="loading">Loading bugs...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!bugs || bugs.length === 0) {
    return <div className="empty-state">No bugs reported yet. Create your first bug report!</div>;
  }

  return (
    <div className="bug-list">
      <h2>Reported Bugs ({bugs.length})</h2>
      <div className="bugs-container">
        {bugs.map(bug => (
          <BugItem
            key={bug._id}
            bug={bug}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default BugList;
