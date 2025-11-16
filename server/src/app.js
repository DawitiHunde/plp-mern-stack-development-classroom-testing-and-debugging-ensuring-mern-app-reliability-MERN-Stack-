const express = require('express');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Bug Tracker API is running' });
});

app.use('/api/bugs', bugRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
