/**
 * Validation utility functions for bug tracker
 */

/**
 * Validates bug title
 * @param {string} title - Bug title to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
const validateTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return { isValid: false, error: 'Title is required and must be a string' };
  }
  
  const trimmedTitle = title.trim();
  
  if (trimmedTitle.length < 3) {
    return { isValid: false, error: 'Title must be at least 3 characters' };
  }
  
  if (trimmedTitle.length > 100) {
    return { isValid: false, error: 'Title cannot exceed 100 characters' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validates bug description
 * @param {string} description - Bug description to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
const validateDescription = (description) => {
  if (!description || typeof description !== 'string') {
    return { isValid: false, error: 'Description is required and must be a string' };
  }
  
  const trimmedDesc = description.trim();
  
  if (trimmedDesc.length < 10) {
    return { isValid: false, error: 'Description must be at least 10 characters' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validates bug status
 * @param {string} status - Bug status to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
const validateStatus = (status) => {
  const validStatuses = ['open', 'in-progress', 'resolved'];
  
  if (!status) {
    return { isValid: true, error: null }; // Status is optional, defaults to 'open'
  }
  
  if (!validStatuses.includes(status)) {
    return { 
      isValid: false, 
      error: `Status must be one of: ${validStatuses.join(', ')}` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validates bug priority
 * @param {string} priority - Bug priority to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
const validatePriority = (priority) => {
  const validPriorities = ['low', 'medium', 'high', 'critical'];
  
  if (!priority) {
    return { isValid: true, error: null }; // Priority is optional, defaults to 'medium'
  }
  
  if (!validPriorities.includes(priority)) {
    return { 
      isValid: false, 
      error: `Priority must be one of: ${validPriorities.join(', ')}` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validates complete bug data
 * @param {object} bugData - Bug data to validate
 * @returns {object} - { isValid: boolean, errors: array }
 */
const validateBugData = (bugData) => {
  const errors = [];
  
  const titleValidation = validateTitle(bugData.title);
  if (!titleValidation.isValid) {
    errors.push(titleValidation.error);
  }
  
  const descValidation = validateDescription(bugData.description);
  if (!descValidation.isValid) {
    errors.push(descValidation.error);
  }
  
  const statusValidation = validateStatus(bugData.status);
  if (!statusValidation.isValid) {
    errors.push(statusValidation.error);
  }
  
  const priorityValidation = validatePriority(bugData.priority);
  if (!priorityValidation.isValid) {
    errors.push(priorityValidation.error);
  }
  
  if (!bugData.reportedBy || bugData.reportedBy.trim().length === 0) {
    errors.push('Reporter name is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateTitle,
  validateDescription,
  validateStatus,
  validatePriority,
  validateBugData
};
