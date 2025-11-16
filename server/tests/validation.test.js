const { validateBug, isValidStatus, isValidPriority } = require('../utils/validation');

describe('Validation Utils', () => {
  describe('validateBug', () => {
    test('should return null for valid bug data', () => {
      const validBug = {
        title: 'Valid Bug Title',
        description: 'This is a valid bug description with enough characters',
        reportedBy: 'John Doe'
      };
      expect(validateBug(validBug)).toBeNull();
    });

    test('should return error for short title', () => {
      const invalidBug = {
        title: 'AB',
        description: 'Valid description here',
        reportedBy: 'John Doe'
      };
      expect(validateBug(invalidBug)).toBe('Title must be at least 3 characters');
    });

    test('should return error for short description', () => {
      const invalidBug = {
        title: 'Valid Title',
        description: 'Short',
        reportedBy: 'John Doe'
      };
      expect(validateBug(invalidBug)).toBe('Description must be at least 10 characters');
    });

    test('should return error for missing reporter', () => {
      const invalidBug = {
        title: 'Valid Title',
        description: 'Valid description here',
        reportedBy: ''
      };
      expect(validateBug(invalidBug)).toBe('Reporter name is required');
    });
  });

  describe('isValidStatus', () => {
    test('should return true for valid statuses', () => {
      expect(isValidStatus('open')).toBe(true);
      expect(isValidStatus('in-progress')).toBe(true);
      expect(isValidStatus('resolved')).toBe(true);
    });

    test('should return false for invalid status', () => {
      expect(isValidStatus('invalid')).toBe(false);
      expect(isValidStatus('closed')).toBe(false);
    });
  });

  describe('isValidPriority', () => {
    test('should return true for valid priorities', () => {
      expect(isValidPriority('low')).toBe(true);
      expect(isValidPriority('medium')).toBe(true);
      expect(isValidPriority('high')).toBe(true);
      expect(isValidPriority('critical')).toBe(true);
    });

    test('should return false for invalid priority', () => {
      expect(isValidPriority('urgent')).toBe(false);
      expect(isValidPriority('normal')).toBe(false);
    });
  });
});
