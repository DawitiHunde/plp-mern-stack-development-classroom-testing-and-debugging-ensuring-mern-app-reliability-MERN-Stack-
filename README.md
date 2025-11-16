# MERN Bug Tracker

A full-stack bug tracking application built with MongoDB, Express, React, and Node.js. This project demonstrates testing and debugging best practices in MERN applications.

## Features

- Report new bugs with detailed information
- View all reported bugs in a list
- Update bug status (open, in-progress, resolved)
- Delete bugs
- Comprehensive error handling
- Full test coverage (unit & integration tests)

## Tech Stack

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- Jest & Supertest (testing)

**Frontend:**
- React
- Axios
- React Testing Library & Jest

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mern-bug-tracker
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Configure environment variables:

Create `.env` file in the `server` directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bugtracker
NODE_ENV=development
```

## Running the Application

### Start Backend Server
```bash
cd server
npm start
```
Server runs on `http://localhost:5000`

### Start Frontend
```bash
cd client
npm start
```
Client runs on `http://localhost:3000`

## Testing

### Backend Tests
```bash
cd server
npm test
```

Run with coverage:
```bash
npm run test:coverage
```

### Frontend Tests
```bash
cd client
npm test
```

Run all tests:
```bash
npm run test:all
```

## Testing Approach

### Backend Testing
- **Unit Tests**: Validation logic, helper functions
- **Integration Tests**: API endpoints (CRUD operations)
- **Mocking**: Database calls using jest-mock

### Frontend Testing
- **Component Tests**: Form validation, button interactions
- **Integration Tests**: API calls and UI updates
- **Rendering Tests**: Different UI states (loading, error, empty)

## Debugging Techniques Used

1. **Console Logging**: Track variable values and execution flow
2. **Chrome DevTools**: Inspect network requests and React component state
3. **Node.js Inspector**: Debug server-side code
4. **Error Boundaries**: Catch and handle React component crashes
5. **Express Middleware**: Centralized error handling

## Error Handling

- Backend: Custom error middleware for consistent error responses
- Frontend: Error boundaries to prevent app crashes
- Validation: Input validation on both client and server
- Network errors: Graceful handling of failed API requests

## Project Structure

```
mern-bug-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API calls
│   │   └── tests/         # Frontend tests
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── tests/            # Backend tests
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/bugs | Get all bugs |
| GET | /api/bugs/:id | Get single bug |
| POST | /api/bugs | Create new bug |
| PUT | /api/bugs/:id | Update bug |
| DELETE | /api/bugs/:id | Delete bug |

## Contributing

This is an educational project for Week 6 of MERN stack learning.

## License

MIT
