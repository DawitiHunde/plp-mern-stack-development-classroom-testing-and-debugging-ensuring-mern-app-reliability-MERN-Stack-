const Bug = require('../models/Bug');
const { validateBugData } = require('../utils/validators');

/**
 * Get all bugs
 */
const getAllBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: bugs.length,
      data: bugs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single bug by ID
 */
const getBugById = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      return res.status(404).json({
        success: false,
        error: 'Bug not found'
      });
    }
    
    res.json({
      success: true,
      data: bug
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new bug
 */
const createBug = async (req, res, next) => {
  try {
    // Validate input
    const validation = validateBugData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }
    
    const bug = await Bug.create(req.body);
    
    res.status(201).json({
      success: true,
      data: bug
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update bug
 */
const updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      return res.status(404).json({
        success: false,
        error: 'Bug not found'
      });
    }
    
    // Update fields
    const allowedUpdates = ['title', 'description', 'status', 'priority'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        bug[field] = req.body[field];
      }
    });
    
    await bug.save();
    
    res.json({
      success: true,
      data: bug
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete bug
 */
const deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      return res.status(404).json({
        success: false,
        error: 'Bug not found'
      });
    }
    
    await bug.deleteOne();
    
    res.json({
      success: true,
      message: 'Bug deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug
};
