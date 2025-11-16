const request = require('supertest');
const app = require('../server');
const Bug = require('../models/Bug');

// Mock the Bug model
jest.mock('../models/Bug');

describe('Bug API Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/bugs', () => {
    test('should return all bugs', async () => {
      const mockBugs = [
        { title: 'Bug 1', description: 'Description 1', status: 'open' },
        { title: 'Bug 2', description: 'Description 2', status: 'resolved' }
      ];

      Bug.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockBugs)
      });

      const response = await request(app).get('/api/bugs');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBugs);
      expect(Bug.find).toHaveBeenCalled();
    });
  });

  describe('POST /api/bugs', () => {
    test('should create a new bug', async () => {
      const newBug = {
        title: 'New Bug',
        description: 'This is a new bug description',
        reportedBy: 'Test User'
      };

      const savedBug = { ...newBug, _id: '123', status: 'open' };
      
      Bug.prototype.save = jest.fn().mockResolvedValue(savedBug);

      const response = await request(app)
        .post('/api/bugs')
        .send(newBug);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newBug);
    });

    test('should return 400 for invalid bug data', async () => {
      const invalidBug = {
        title: 'AB',
        description: 'Short',
        reportedBy: 'User'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(invalidBug);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/bugs/:id', () => {
    test('should update a bug', async () => {
      const updatedBug = {
        title: 'Updated Bug',
        description: 'Updated description',
        status: 'resolved'
      };

      Bug.findByIdAndUpdate.mockResolvedValue(updatedBug);

      const response = await request(app)
        .put('/api/bugs/123')
        .send({ status: 'resolved' });

      expect(response.status).toBe(200);
    });

    test('should return 404 for non-existent bug', async () => {
      Bug.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app)
        .put('/api/bugs/999')
        .send({ status: 'resolved' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    test('should delete a bug', async () => {
      Bug.findByIdAndDelete.mockResolvedValue({ _id: '123' });

      const response = await request(app).delete('/api/bugs/123');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Bug deleted successfully');
    });

    test('should return 404 for non-existent bug', async () => {
      Bug.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete('/api/bugs/999');

      expect(response.status).toBe(404);
    });
  });
});
