# 🐞 Debugging Guide for Bug Tracker Application

This guide demonstrates various debugging techniques used in the Bug Tracker application.

## Table of Contents

1. [Console Logging](#console-logging)
2. [Chrome DevTools](#chrome-devtools)
3. [Node.js Debugger](#nodejs-debugger)
4. [Error Boundaries](#error-boundaries)
5. [Common Issues & Solutions](#common-issues--solutions)

## Console Logging

### Backend Logging

**Request Logging** (server/src/app.js):
```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

**Controller Logging** (server/src/controllers/bugController.js):
```javascript
const getAllBugs = async (req, res, next) => {
  try {
    console.log('Fetching all bugs...');
    const bugs = await Bug.find().sort({ createdAt: -1 });
    console.log(`Found ${bugs.length} bugs`);
    res.json({ success: true, count: bugs.length, data: bugs });
  } catch (error) {
    console.error('Error fetching bugs:', error);
    next(error);
  }
};
```

### Frontend Logging

**API Interceptor** (client/src/services/api.js):
```javascript
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

**Component Logging** (client/src/App.jsx):
```javascript
const loadBugs = async () => {
  try {
    console.log('Loading bugs...');
    const data = await fetchBugs();
    console.log('Bugs loaded:', data.length);
    setBugs(data);
  } catch (err) {
    console.error('Failed to load bugs:', err);
    setError(err.message);
  }
};
```

## Chrome DevTools

### Network Tab Debugging

1. **Open DevTools**: Press F12 or right-click → Inspect
2. **Navigate to Network tab**
3. **Perform actions** in the app (create/update/delete bugs)
4. **Inspect requests**:
   - Check request method (GET, POST, PUT, DELETE)
   - View request headers
   - Inspect request payload
   - Check response status and data

**Example: Debugging Failed API Call**
```
Request URL: http://localhost:5000/api/bugs
Request Method: POST
Status Code: 400 Bad Request

Response:
{
  "success": false,
  "error": "Validation failed",
  "details": ["Title must be at least 3 characters"]
}
```

### Console Tab

Monitor console logs from both frontend and backend:
```javascript
// Frontend logs appear in browser console
console.log('Bug created:', newBug);

// Backend logs appear in terminal
console.log('POST /api/bugs - 201 Created');
```

### React DevTools

1. **Install React DevTools** extension
2. **Open Components tab**
3. **Inspect component tree**:
   - View props and state
   - Track state changes
   - Identify re-renders

**Example: Debugging State Issues**
```
App
  ├─ ErrorBoundary
  │   ├─ BugForm
  │   │   └─ formData: { title: "", description: "" }
  │   └─ BugList
  │       └─ bugs: [{ _id: "123", title: "Bug 1" }]
```

## Node.js Debugger

### VS Code Debugger Setup

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/server/src/server.js",
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "program": "${workspaceFolder}/server/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Using Breakpoints

1. **Set breakpoints** by clicking left of line numbers
2. **Start debugging** (F5)
3. **Step through code**:
   - F10: Step over
   - F11: Step into
   - Shift+F11: Step out
4. **Inspect variables** in Debug sidebar

**Example: Debugging Controller**
```javascript
const createBug = async (req, res, next) => {
  try {
    // Set breakpoint here
    const validation = validateBugData(req.body);
    
    // Inspect validation result
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }
    
    const bug = await Bug.create(req.body);
    res.status(201).json({ success: true, data: bug });
  } catch (error) {
    next(error);
  }
};
```

### Command Line Debugging

```bash
# Start Node.js with inspector
node --inspect server/src/server.js

# Or with break on first line
node --inspect-brk server/src/server.js
```

Then open `chrome://inspect` in Chrome.

## Error Boundaries

### React Error Boundary Implementation

**ErrorBoundary.jsx**:
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Could send to error tracking service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh.</div>;
    }
    return this.props.children;
  }
}
```

### Testing Error Boundary

Create a component that throws an error:
```javascript
const BuggyComponent = () => {
  throw new Error('Intentional error for testing');
};

// Wrap with ErrorBoundary
<ErrorBoundary>
  <BuggyComponent />
</ErrorBoundary>
```

## Common Issues & Solutions

### Issue 1: CORS Errors

**Symptom:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
```javascript
// server/src/app.js
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Issue 2: MongoDB Connection Failed

**Symptom:**
```
MongooseServerSelectionError: connect ECONNREFUSED
```

**Debug Steps:**
1. Check if MongoDB is running: `mongod`
2. Verify connection string in `.env`
3. Check MongoDB logs
4. Test connection:
```javascript
mongoose.connect(uri)
  .then(() => console.log('Connected'))
  .catch(err => console.error('Connection error:', err));
```

### Issue 3: Validation Errors Not Showing

**Debug Steps:**
1. Check network tab for API response
2. Verify error state in React DevTools
3. Add console logs:
```javascript
const handleCreateBug = async (bugData) => {
  try {
    const newBug = await createBug(bugData);
    console.log('Bug created:', newBug);
  } catch (err) {
    console.error('Create bug error:', err);
    console.error('Error response:', err.response?.data);
  }
};
```

### Issue 4: State Not Updating

**Debug Steps:**
1. Check if setState is called
2. Verify state in React DevTools
3. Add useEffect to log state changes:
```javascript
useEffect(() => {
  console.log('Bugs state updated:', bugs);
}, [bugs]);
```

### Issue 5: API Returns 404

**Debug Steps:**
1. Verify route definition:
```javascript
// server/src/routes/bugRoutes.js
router.get('/', getAllBugs);  // Correct
router.get('/bugs', getAllBugs);  // Wrong if mounted at /api/bugs
```

2. Check route mounting:
```javascript
// server/src/app.js
app.use('/api/bugs', bugRoutes);  // Routes are at /api/bugs/*
```

3. Verify API URL in frontend:
```javascript
// client/src/services/api.js
const API_URL = 'http://localhost:5000/api';  // No trailing slash
```

## Debugging Checklist

### Before Starting
- [ ] Check all services are running (MongoDB, Backend, Frontend)
- [ ] Verify environment variables are set
- [ ] Clear browser cache if needed

### When Bug Occurs
- [ ] Read error message carefully
- [ ] Check browser console for errors
- [ ] Check terminal for backend errors
- [ ] Inspect network requests in DevTools
- [ ] Add console.logs at key points
- [ ] Use debugger breakpoints
- [ ] Check React DevTools for state issues

### After Fixing
- [ ] Test the fix thoroughly
- [ ] Write a test to prevent regression
- [ ] Document the issue and solution
- [ ] Remove debug console.logs

## Performance Debugging

### React Profiler

```javascript
import { Profiler } from 'react';

function onRenderCallback(
  id, phase, actualDuration, baseDuration, startTime, commitTime
) {
  console.log(`${id} took ${actualDuration}ms to render`);
}

<Profiler id="BugList" onRender={onRenderCallback}>
  <BugList bugs={bugs} />
</Profiler>
```

### Backend Performance

```javascript
// Add timing middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

## Additional Resources

- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)
