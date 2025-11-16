const request = require('supertest');
const app = require('../../src/app');
const Bug = require('../../src/models/Bug');

describe('Bug Routes Integration Tests', () => {
  
  describe('GET /api/bugs', () => {
    test('should return empty array when no bugs exist', async () => {
      const res = await request(app).get('/api/bugs');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
      expect(res.body.count).toBe(0);
    });
    
    test('should return all bugs', async () => {
      await Bug.create([
        {
          title: 'Bug 1',
          description: 'Description for bug 1',
          reportedBy: 'User 1'
        },
        {
          title: 'Bug 2',
          description: 'Description for bug 2',
          reportedBy: 'User 2'
        }
      ]);
      
      const res = await request(app).get('/api/bugs');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toHaveLength(2);
    });
  });
  
  describe('POST /api/bugs', () => {
    test('should create a new bug with valid data', async () => {
      const bugData = {
        title: 'New Bug',
        description: 'This is a new bug description',
        status: 'open',
        priority: 'high',
        reportedBy: 'John Doe'
      };
      
      const res = await request(app)
        .post('/api/bugs')
        .send(bugData);
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.title).toBe(bugData.title);
    });
    
    test('should fail with invalid data', async () => {
      const invalidData = {
        title: 'AB',
        description: 'Short'
      };
      
      const res = await request(app)
        .post('/api/bugs')
        .send(invalidData);
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('GET /api/bugs/:id', () => {
    test('should return a bug by ID', async () => {
      const bug = await Bug.create({
        title: 'Test Bug',
        description: 'Test description',
        reportedBy: 'Tester'
      });
      
      const res = await request(app).get(`/api/bugs/${bug._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(bug._id.toString());
    });
    
    test('should return 404 for non-existent bug', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app).get(`/api/bugs/${fakeId}`);
      
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('PUT /api/bugs/:id', () => {
    test('should update a bug', async () => {
      const bug = await Bug.create({
        title: 'Original Title',
        description: 'Original description',
        reportedBy: 'Tester'
      });
      
      const updates = {
        status: 'in-progress',
        priority: 'critical'
      };
      
      const res = await request(app)
        .put(`/api/bugs/${bug._id}`)
        .send(updates);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('in-progress');
      expect(res.body.data.priority).toBe('critical');
    });
  });
  
  describe('DELETE /api/bugs/:id', () => {
    test('should delete a bug', async () => {
      const bug = await Bug.create({
        title: 'Bug to Delete',
        description: 'This bug will be deleted',
        reportedBy: 'Tester'
      });
      
      const res = await request(app).delete(`/api/bugs/${bug._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      
      const deletedBug = await Bug.findById(bug._id);
      expect(deletedBug).toBeNull();
    });
  });
});
