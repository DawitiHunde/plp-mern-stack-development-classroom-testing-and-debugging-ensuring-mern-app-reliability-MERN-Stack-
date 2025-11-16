const {
  validateTitle,
  validateDescription,
  validateStatus,
  validatePriority,
  validateBugData
} = require('../../src/utils/validators');

describe('Validator Unit Tests', () => {
  
  describe('validateTitle', () => {
    test('should pass with valid title', () => {
      const result = validateTitle('Valid Bug Title');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });
    
    test('should fail with empty title', () => {
      const result = validateTitle('');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('at least 3 characters');
    });
    
    test('should fail with title too short', () => {
      const result = validateTitle('AB');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('at least 3 characters');
    });
    
    test('should fail with title too long', () => {
      const longTitle = 'A'.repeat(101);
      const result = validateTitle(longTitle);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed 100 characters');
    });
    
    test('should fail with non-string title', () => {
      const result = validateTitle(123);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be a string');
    });
    
    test('should trim whitespace', () => {
      const result = validateTitle('   Valid Title   ');
      expect(result.isValid).toBe(true);
    });
  });
  
  describe('validateDescription', () => {
    test('should pass with valid description', () => {
      const result = validateDescription('This is a valid bug description');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });
    
    test('should fail with description too short', () => {
      const result = validateDescription('Short');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('at least 10 characters');
    });
    
    test('should fail with empty description', () => {
      const result = validateDescription('');
      expect(result.isValid).toBe(false);
    });
    
    test('should fail with non-string description', () => {
      const result = validateDescription(null);
      expect(result.isValid).toBe(false);
    });
  });
  
  describe('validateStatus', () => {
    test('should pass with valid status', () => {
      expect(validateStatus('open').isValid).toBe(true);
      expect(validateStatus('in-progress').isValid).toBe(true);
      expect(validateStatus('resolved').isValid).toBe(true);
    });
    
    test('should pass with undefined status (optional)', () => {
      const result = validateStatus(undefined);
      expect(result.isValid).toBe(true);
    });
    
    test('should fail with invalid status', () => {
      const result = validateStatus('invalid-status');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be one of');
    });
  });
  
  describe('validatePriority', () => {
    test('should pass with valid priority', () => {
      expect(validatePriority('low').isValid).toBe(true);
      expect(validatePriority('medium').isValid).toBe(true);
      expect(validatePriority('high').isValid).toBe(true);
      expect(validatePriority('critical').isValid).toBe(true);
    });
    
    test('should pass with undefined priority (optional)', () => {
      const result = validatePriority(undefined);
      expect(result.isValid).toBe(true);
    });
    
    test('should fail with invalid priority', () => {
      const result = validatePriority('super-urgent');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be one of');
    });
  });
  
  describe('validateBugData', () => {
    const validBugData = {
      title: 'Valid Bug Title',
      description: 'This is a valid bug description with enough characters',
      status: 'open',
      priority: 'high',
      reportedBy: 'John Doe'
    };
    
    test('should pass with complete valid data', () => {
      const result = validateBugData(validBugData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
    
    test('should fail with missing title', () => {
      const data = { ...validBugData, title: '' };
      const result = validateBugData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
    
    test('should fail with missing reportedBy', () => {
      const data = { ...validBugData, reportedBy: '' };
      const result = validateBugData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Reporter name is required');
    });
    
    test('should collect multiple errors', () => {
      const data = {
        title: 'AB',
        description: 'Short',
        status: 'invalid',
        priority: 'wrong',
        reportedBy: ''
      };
      const result = validateBugData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});
