import React, { Component } from 'react';
import './BugForm.css';

class BugForm extends Component {
  state = {
    title: '',
    description: '',
    priority: 'medium',
    reportedBy: '',
    errors: {},
    submitting: false
  };

  validateForm = () => {
    const errors = {};
    const { title, description, reportedBy } = this.state;

    if (!title.trim()) {
      errors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }

    if (!description.trim()) {
      errors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }

    if (!reportedBy.trim()) {
      errors.reportedBy = 'Reporter name is required';
    }

    return errors;
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ 
      [name]: value,
      errors: { ...this.state.errors, [name]: '' }
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = this.validateForm();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ submitting: true });

    const { title, description, priority, reportedBy } = this.state;
    const result = await this.props.onSubmit({
      title,
      description,
      priority,
      reportedBy
    });

    if (result.success) {
      this.setState({
        title: '',
        description: '',
        priority: 'medium',
        reportedBy: '',
        errors: {},
        submitting: false
      });
    } else {
      this.setState({
        errors: { submit: result.error },
        submitting: false
      });
    }
  };

  render() {
    const { title, description, priority, reportedBy, errors, submitting } = this.state;

    return (
      <div className="bug-form-container">
        <h2>Report a Bug</h2>
        <form onSubmit={this.handleSubmit} className="bug-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={this.handleChange}
              className={errors.title ? 'error' : ''}
              placeholder="Brief description of the bug"
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
              className={errors.description ? 'error' : ''}
              placeholder="Detailed description of the bug"
              rows="4"
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={this.handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reportedBy">Reported By *</label>
            <input
              type="text"
              id="reportedBy"
              name="reportedBy"
              value={reportedBy}
              onChange={this.handleChange}
              className={errors.reportedBy ? 'error' : ''}
              placeholder="Your name"
            />
            {errors.reportedBy && <span className="error-text">{errors.reportedBy}</span>}
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? 'Submitting...' : 'Report Bug'}
          </button>
        </form>
      </div>
    );
  }
}

export default BugForm;
