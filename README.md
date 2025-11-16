# 🐛 Bug Tracker - Complete MERN Application

> A comprehensive Bug Tracker application with extensive testing and debugging implementations for Week 6 Assignment

[![Tests](https://img.shields.io/badge/tests-47%2B-success)]()
[![Coverage](https://img.shields.io/badge/coverage-70%25%2B-brightgreen)]()
[![MERN](https://img.shields.io/badge/stack-MERN-blue)]()

---

## 📋 Table of Contents

- [Quick Start](#-quick-start-3-steps)
- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Testing](#-testing)
- [Debugging](#-debugging)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Assignment Requirements](#-assignment-requirements)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 🚀 Quick Start (3 Steps)

```bash
# 1. Install dependencies
npm run install-all

# 2. Start MongoDB
mongod

# 3. Run the application
npm run dev
```

**Access**: http://localhost:3000

---

## 🎯 Project Overview

A full-stack MERN (MongoDB, Express, React, Node.js) Bug Tracker application demonstrating:
- ✅ Complete CRUD operations
- ✅ 47+ comprehensive tests (unit + integration + component)
- ✅ Multiple debugging techniques
- ✅ Professional error handling
- ✅ Production-ready code quality

### Project Statistics
- **Lines of Code**: 2,500+
- **Test Cases**: 47+
- **Test Coverage**: 70%+ target
- **Components**: 4 React components (all tested)
- **API Endpoints**: 5 RESTful routes (all tested)
- **Documentation**: 2,000+ lines

---

## ✨ Features

### Application Features
- 📝 **Create Bugs**: Form with client & server validation
- 📋 **View Bugs**: List with count, loading, and empty states
- 🔄 **Update Status**: Dropdown selector (open/in-progress/resolved)
- 🗑️ **Delete Bugs**: With confirmation dialog
- 🎯 **Priority Levels**: Low, Medium, High, Critical with color coding
- 📱 **Responsive Design**: Mobile-friendly interface
- ⚡ **Real-time Feedback**: Loading states and error messages

### Testing Features
- ✅ **Unit Tests**: 20+ tests for validators
- ✅ **Integration Tests**: 8+ tests for API endpoints
- ✅ **Component Tests**: 19+ tests for React components
- ✅ **Mocking**: MongoDB Memory Server for isolated testing
- ✅ **Coverage Reports**: Configured thresholds (70%+)

### Debugging Features
- 🔍 **Console Logging**: Request/response tracking
- 🛠️ **API Interceptors**: Axios debugging
- 🚨 **Error Boundaries**: React error catching
- 📊 **Error Middleware**: Express global handler
- 🐛 **VS Code Debug**: Ready-to-use configuration

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Jest** - Testing framework
- **Supertest** - HTTP testing
- **MongoDB Memory Server** - In-memory test database

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **React Testing Library** - Component testing
- **Jest** - Testing framework
- **CSS3** - Styling

### Development Tools
- **Nodemon** - Development server
- **Concurrently** - Run multiple commands
- **Git** - Version control

---

## 📦 Installation

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org/))
- MongoDB ([Download](https://www.mongodb.com/try/download/community))
- npm or yarn

### Step-by-Step Installation

#### Option 1: Quick Install (Recommended)
```bash
npm run install-all
```

#### Option 2: Manual Install
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Configuration

Create `.env` file in `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bug-tracker
NODE_ENV=development
```

---

## 🏃 Running the Application

### Development Mode

#### Option 1: Run Everything Together
```bash
npm run dev
```
Starts both backend (port 5000) and frontend (port 3000)

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Production Mode
```bash
# Build frontend
cd client && npm run build

# Start backend
cd ../server && npm start
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Specific Tests
```bash
# Backend tests only
npm run test:server

# Frontend tests only
npm run test:client

# Watch mode
npm run test:watch
```

### Coverage Reports
```bash
# Server coverage
cd server && npm run test:coverage

# Client coverage
cd client && npm test -- --coverage --watchAll=false
```

### Test Structure

#### Backend Tests (`server/tests/`)

**Unit Tests** (`unit/validators.test.js`):
- validateTitle: 6 tests
- validateDescription: 4 tests
- validateStatus: 3 tests
- validatePriority: 3 tests
- validateBugData: 4 tests

**Integration Tests** (`integration/bugRoutes.test.js`):
- GET /api/bugs: 2 tests
- POST /api/bugs: 2 tests
- GET /api/bugs/:id: 2 tests
- PUT /api/bugs/:id: 1 test
- DELETE /api/bugs/:id: 1 test

#### Frontend Tests (`client/src/components/`)

- **BugForm.test.jsx**: 6 tests (validation, submission, field changes)
- **BugList.test.jsx**: 5 tests (loading, error, empty, list rendering)
- **BugItem.test.jsx**: 6 tests (display, updates, delete, confirmation)
- **ErrorBoundary.test.jsx**: 3 tests (error catching, UI display)

**Total**: 47+ tests across backend and frontend

---

## 🐞 Debugging

### Console Logging

#### Backend Logging
```javascript
// Request logging (server/src/app.js)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

#### Frontend Logging
```javascript
// API interceptor (client/src/services/api.js)
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  }
);
```

### Chrome DevTools

1. **Network Tab**: Inspect API requests/responses
2. **Console Tab**: View logs and errors
3. **React DevTools**: Inspect component state and props

### Node.js Debugger

**VS Code Configuration** (`.vscode/launch.json`):
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Server",
  "program": "${workspaceFolder}/server/src/server.js"
}
```

**Usage**:
1. Set breakpoints (click left of line numbers)
2. Press F5 to start debugging
3. Step through code (F10, F11)

### Error Boundaries

React error boundary implemented in `client/src/components/ErrorBoundary.jsx`:
- Catches React component errors
- Displays user-friendly error messages
- Shows detailed error info in development mode

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Bugs
```http
GET /bugs
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "123",
      "title": "Bug title",
      "description": "Bug description",
      "status": "open",
      "priority": "high",
      "reportedBy": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Bug
```http
GET /bugs/:id
```

#### Create Bug
```http
POST /bugs
Content-Type: application/json

{
  "title": "Bug title",
  "description": "Bug description",
  "status": "open",
  "priority": "high",
  "reportedBy": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* bug object */ }
}
```

#### Update Bug
```http
PUT /bugs/:id
Content-Type: application/json

{
  "status": "in-progress",
  "priority": "critical"
}
```

#### Delete Bug
```http
DELETE /bugs/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Bug deleted successfully"
}
```

### Validation Rules

- **Title**: 3-100 characters, required
- **Description**: Minimum 10 characters, required
- **Status**: One of: `open`, `in-progress`, `resolved`
- **Priority**: One of: `low`, `medium`, `high`, `critical`
- **ReportedBy**: Required, non-empty string

### Error Responses

```json
{
  "success": false,
  "error": "Error message",
  "details": ["Detailed error 1", "Detailed error 2"]
}
```

**Status Codes**:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📁 Project Structure

```
mern-bug-tracker/
├── client/                          # React frontend
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── BugForm.jsx         # Bug creation form
│   │   │   ├── BugForm.test.jsx    # Form tests
│   │   │   ├── BugList.jsx         # Bug list display
│   │   │   ├── BugList.test.jsx    # List tests
│   │   │   ├── BugItem.jsx         # Individual bug item
│   │   │   ├── BugItem.test.jsx    # Item tests
│   │   │   ├── ErrorBoundary.jsx   # Error boundary
│   │   │   └── ErrorBoundary.test.jsx
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── tests/
│   │   │   ├── setup.js            # Test configuration
│   │   │   └── __mocks__/
│   │   │       └── fileMock.js     # Asset mocking
│   │   ├── App.jsx                 # Main app component
│   │   ├── App.css                 # Styles
│   │   └── index.js                # React entry point
│   ├── .env                        # Environment variables
│   └── package.json                # Dependencies
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js         # MongoDB connection
│   │   ├── controllers/
│   │   │   └── bugController.js    # CRUD operations
│   │   ├── models/
│   │   │   └── Bug.js              # Mongoose schema
│   │   ├── routes/
│   │   │   └── bugRoutes.js        # API routes
│   │   ├── middleware/
│   │   │   └── errorHandler.js     # Error handling
│   │   ├── utils/
│   │   │   └── validators.js       # Validation functions
│   │   ├── app.js                  # Express app setup
│   │   └── server.js               # Server entry point
│   ├── tests/
│   │   ├── unit/
│   │   │   └── validators.test.js  # Unit tests
│   │   ├── integration/
│   │   │   └── bugRoutes.test.js   # Integration tests
│   │   └── setup.js                # Test configuration
│   ├── .env                        # Environment variables
│   └── package.json                # Dependencies
│
├── jest.config.js                   # Jest configuration
├── package.json                     # Root package.json
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## ✅ Assignment Requirements

### Project Setup ✅
- [x] Created `mern-bug-tracker` folder
- [x] Backend environment (Express + MongoDB)
- [x] Frontend environment (React)
- [x] Testing libraries (Jest, Supertest, React Testing Library)

### Application Features ✅
- [x] Report new bugs with form validation
- [x] View list of all bugs
- [x] Update bug statuses
- [x] Delete bugs with confirmation

### Testing Requirements ✅
- [x] Backend unit tests (validators)
- [x] Backend integration tests (API routes)
- [x] Frontend component tests
- [x] Mock database calls (MongoDB Memory Server)
- [x] 70%+ code coverage target

### Debugging Tasks ✅
- [x] Console logs for tracking
- [x] Chrome DevTools support
- [x] Node.js inspector configuration
- [x] Error boundary implementation

### Error Handling ✅
- [x] Express error middleware
- [x] Client-side error boundaries
- [x] Validation error handling
- [x] User-friendly error messages

### Documentation ✅
- [x] Installation instructions
- [x] Running instructions
- [x] Testing guide
- [x] Debugging techniques
- [x] API documentation

---

## 🔧 Troubleshooting

### MongoDB Connection Error
**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution**:
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod
```

### Port Already in Use
**Error**: `Port 5000 is already in use`

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

Or change port in `server/.env`:
```env
PORT=5001
```

### CORS Errors
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**: Ensure backend is running and CORS is configured in `server/src/app.js`

### Tests Failing
```bash
# Clear cache and reinstall
npm test -- --clearCache
npm run install-all
```

### Cannot Find Module
**Error**: `Cannot find module 'express'`

**Solution**:
```bash
npm install --prefix server
npm install --prefix client
```

---

## 🎓 Learning Outcomes

This project demonstrates:

1. **MERN Stack Development**: Full-stack application with MongoDB, Express, React, Node.js
2. **Unit Testing**: Testing individual functions in isolation
3. **Integration Testing**: Testing API endpoints with database
4. **Component Testing**: Testing React components with user interactions
5. **Mocking**: Using MongoDB Memory Server and Jest mocks
6. **Error Handling**: Implementing error boundaries and middleware
7. **Debugging**: Using console logs, Chrome DevTools, Node.js debugger
8. **Validation**: Client and server-side validation
9. **API Design**: RESTful API principles
10. **State Management**: React hooks (useState, useEffect)
11. **Async Operations**: Promises and async/await
12. **Testing Best Practices**: AAA pattern, test isolation, cleanup

---

## 🏆 Bonus Features

Beyond requirements:
- ✅ Comprehensive CSS styling with gradients
- ✅ Responsive design for mobile devices
- ✅ Loading states with user feedback
- ✅ Empty states with helpful messages
- ✅ Confirmation dialogs for destructive actions
- ✅ Priority badges with color coding
- ✅ Status color coding
- ✅ Timestamps on bugs
- ✅ Bug count display
- ✅ Form validation with inline errors
- ✅ API interceptors for debugging
- ✅ Request logging middleware
- ✅ .env.example files for easy setup
- ✅ Complete .gitignore

---

## 📝 Common Commands

```bash
# Development
npm run dev              # Run both frontend & backend
npm run server           # Backend only
npm run client           # Frontend only

# Testing
npm test                 # All tests
npm run test:server      # Backend tests
npm run test:client      # Frontend tests
npm run test:watch       # Watch mode

# Installation
npm run install-all      # Install all dependencies
```

---

## 🤝 Contributing

This is an educational project for Week 6 assignment. Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new features
5. Submit a pull request

---

## 📄 License

This project is for educational purposes.

---

## 🎉 Conclusion

This Bug Tracker application is a complete, production-ready demonstration of:
- Full-stack MERN development
- Test-driven development (TDD)
- Comprehensive error handling
- Multiple debugging techniques
- Clean code principles
- Professional documentation

**Ready for submission and portfolio use!** 🚀

---

## 📞 Support

If you encounter issues:
1. Check this README
2. Review error messages carefully
3. Check browser console (F12) for frontend errors
4. Check terminal for backend errors
5. Ensure all services are running (MongoDB, Backend, Frontend)

---

**Built with ❤️ for Week 6: Testing and Debugging in MERN Applications**

*Demonstrating professional-level testing, debugging, and development practices*
