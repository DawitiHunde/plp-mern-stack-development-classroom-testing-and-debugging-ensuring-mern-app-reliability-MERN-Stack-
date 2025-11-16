import React, { Component } from 'react';
import './App.css';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import { getAllBugs, createBug, updateBug, deleteBug } from './services/bugService';

class App extends Component {
  state = {
    bugs: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    this.fetchBugs();
  }

  fetchBugs = async () => {
    try {
      this.setState({ loading: true, error: null });
      const bugs = await getAllBugs();
      this.setState({ bugs, loading: false });
    } catch (error) {
      console.error('Error fetching bugs:', error);
      this.setState({ 
        error: 'Failed to load bugs. Please try again.', 
        loading: false 
      });
    }
  };

  handleCreateBug = async (bugData) => {
    try {
      const newBug = await createBug(bugData);
      this.setState(prevState => ({
        bugs: [newBug, ...prevState.bugs]
      }));
      return { success: true };
    } catch (error) {
      console.error('Error creating bug:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create bug' 
      };
    }
  };

  handleUpdateBug = async (id, updates) => {
    try {
      const updatedBug = await updateBug(id, updates);
      this.setState(prevState => ({
        bugs: prevState.bugs.map(bug => 
          bug._id === id ? updatedBug : bug
        )
      }));
    } catch (error) {
      console.error('Error updating bug:', error);
      alert('Failed to update bug');
    }
  };

  handleDeleteBug = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bug?')) {
      return;
    }

    try {
      await deleteBug(id);
      this.setState(prevState => ({
        bugs: prevState.bugs.filter(bug => bug._id !== id)
      }));
    } catch (error) {
      console.error('Error deleting bug:', error);
      alert('Failed to delete bug');
    }
  };

  render() {
    const { bugs, loading, error } = this.state;

    return (
      <ErrorBoundary>
        <div className="App">
          <header className="App-header">
            <h1>🐛 Bug Tracker</h1>
          </header>
          
          <main className="App-main">
            <BugForm onSubmit={this.handleCreateBug} />
            
            {error && <div className="error-message">{error}</div>}
            
            {loading ? (
              <div className="loading">Loading bugs...</div>
            ) : (
              <BugList 
                bugs={bugs}
                onUpdate={this.handleUpdateBug}
                onDelete={this.handleDeleteBug}
              />
            )}
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
