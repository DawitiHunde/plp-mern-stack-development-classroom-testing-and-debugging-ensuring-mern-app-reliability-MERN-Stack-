const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');
const { validateBug } = require('../utils/validation');

// Get all bugs
router.get('/', async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    next(error);
  }
});

// Get single bug
router.get('/:id', async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.json(bug);
  } catch (error) {
    next(error);
  }
});

// Create new bug
router.post('/', async (req, res, next) => {
  try {
    const validationError = validateBug(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const bug = new Bug(req.body);
    const savedBug = await bug.save();
    res.status(201).json(savedBug);
  } catch (error) {
    next(error);
  }
});

// Update bug
router.put('/:id', async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    
    res.json(bug);
  } catch (error) {
    next(error);
  }
});

// Delete bug
router.delete('/:id', async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    
    res.json({ message: 'Bug deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
