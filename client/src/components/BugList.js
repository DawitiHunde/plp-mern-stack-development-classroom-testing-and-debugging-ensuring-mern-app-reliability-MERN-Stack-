import React from 'react';
import BugItem from './BugItem';
import './BugList.css';

const BugList = ({ bugs, onUpdate, onDelete }) => {
  if (bugs.length === 0) {
    return (
      <div className="bug-list-empty">
        <p>No bugs reported yet. Great job! 🎉</p>
      </div>
    );
  }

  return (
    <div className="bug-list">
      <h2>Reported Bugs ({bugs.length})</h2>
      <div className="bug-items">
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
