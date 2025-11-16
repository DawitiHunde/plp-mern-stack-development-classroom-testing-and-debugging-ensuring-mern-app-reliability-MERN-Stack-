import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import { fetchBugs, createBug, updateBug, deleteBug } from './services/api';
import './App.css';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBugs();
  }, []);

  const loadBugs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBugs();
      setBugs(data);
    } catch (err) {
      console.error('Failed to load bugs:', err);
      setError(err.message || 'Failed to load bugs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBug = async (bugData) => {
    try {
      const newBug = await createBug(bugData);
      setBugs(prev => [newBug, ...prev]);
    } catch (err) {
      console.error('Failed to create bug:', err);
      alert('Failed to create bug: ' + err.message);
    }
  };

  const handleUpdateBug = async (id, updates) => {
    try {
      const updatedBug = await updateBug(id, updates);
      setBugs(prev => prev.map(bug => 
        bug._id === id ? updatedBug : bug
      ));
    } catch (err) {
      console.error('Failed to update bug:', err);
      alert('Failed to update bug: ' + err.message);
    }
  };

  const handleDeleteBug = async (id) => {
    try {
      await deleteBug(id);
      setBugs(prev => prev.filter(bug => bug._id !== id));
    } catch (err) {
      console.error('Failed to delete bug:', err);
      alert('Failed to delete bug: ' + err.message);
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="app-header">
          <h1>🐛 Bug Tracker</h1>
          <p>Track and manage software bugs efficiently</p>
        </header>

        <main className="app-main">
          <section className="form-section">
            <h2>Report a New Bug</h2>
            <BugForm onSubmit={handleCreateBug} />
          </section>

          <section className="list-section">
            <BugList
              bugs={bugs}
              onUpdate={handleUpdateBug}
              onDelete={handleDeleteBug}
              loading={loading}
              error={error}
            />
          </section>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
