# 🚀 Quick Start Guide

Get the Bug Tracker application up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js v18+ installed (`node --version`)
- ✅ MongoDB installed and running (`mongod --version`)
- ✅ npm or yarn installed (`npm --version`)

## Installation (3 steps)

### Step 1: Install Dependencies

```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

Or manually:
```bash
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### Step 2: Configure Environment

```bash
# Copy environment file
cp server/.env.example server/.env
```

Edit `server/.env` if needed:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bug-tracker
NODE_ENV=development
```

### Step 3: Start MongoDB

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

## Running the Application

### Option 1: Run Everything Together (Recommended)

```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 3000) concurrently.

### Option 2: Run Separately

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

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## Testing

### Run All Tests
```bash
npm test
```

### Run Specific Tests
```bash
# Server tests only
npm run test:server

# Client tests only
npm run test:client

# Watch mode
npm run test:watch
```

### View Coverage
```bash
# Server coverage
cd server && npm run test:coverage

# Client coverage
cd client && npm test -- --coverage --watchAll=false
```

## Verify Installation

### 1. Check Backend
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Bug Tracker API is running"
}
```

### 2. Check Frontend
Open http://localhost:3000 in your browser. You should see the Bug Tracker interface.

### 3. Create a Test Bug
1. Fill out the form:
   - Title: "Test Bug"
   - Description: "This is a test bug to verify the application works"
   - Reporter: "Your Name"
2. Click "Report Bug"
3. Bug should appear in the list below

## Troubleshooting

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
# Windows - Find and kill process
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
rm -rf node_modules client/node_modules server/node_modules
npm run install-all

# Clear Jest cache
npm test -- --clearCache
```

## Next Steps

1. ✅ Read the [README.md](README.md) for full documentation
2. ✅ Check [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) for debugging techniques
3. ✅ Review [TESTING_STRATEGY.md](TESTING_STRATEGY.md) for testing approach
4. ✅ Explore the code and start building!

## Common Commands Reference

```bash
# Development
npm run dev              # Run both frontend and backend
npm run server           # Run backend only
npm run client           # Run frontend only

# Testing
npm test                 # Run all tests
npm run test:server      # Server tests
npm run test:client      # Client tests
npm run test:watch       # Watch mode

# Installation
npm run install-all      # Install all dependencies
```

## Project Structure Quick Reference

```
mern-bug-tracker/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components + tests
│   │   ├── services/    # API service layer
│   │   └── App.jsx      # Main app component
│   └── package.json
├── server/              # Express backend
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Custom middleware
│   │   └── utils/       # Helper functions
│   ├── tests/           # Backend tests
│   └── package.json
└── package.json         # Root package.json
```

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review error messages carefully
- Check browser console (F12) for frontend errors
- Check terminal for backend errors
- Ensure all services are running

Happy coding! 🐛✨
