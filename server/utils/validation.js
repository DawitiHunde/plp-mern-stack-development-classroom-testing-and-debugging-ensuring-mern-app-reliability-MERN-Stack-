// Validation helper functions

const validateBug = (bugData) => {
  const { title, description, reportedBy } = bugData;

  if (!title || title.trim().length < 3) {
    return 'Title must be at least 3 characters';
  }

  if (!description || description.trim().length < 10) {
    return 'Description must be at least 10 characters';
  }

  if (!reportedBy || reportedBy.trim().length === 0) {
    return 'Reporter name is required';
  }

  return null;
};

const isValidStatus = (status) => {
  const validStatuses = ['open', 'in-progress', 'resolved'];
  return validStatuses.includes(status);
};

const isValidPriority = (priority) => {
  const validPriorities = ['low', 'medium', 'high', 'critical'];
  return validPriorities.includes(priority);
};

module.exports = {
  validateBug,
  isValidStatus,
  isValidPriority
};
