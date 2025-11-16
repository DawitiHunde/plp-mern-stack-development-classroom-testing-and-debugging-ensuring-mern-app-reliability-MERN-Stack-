# Testing Strategy for Bug Tracker Application

## Overview

This document outlines the comprehensive testing strategy implemented in the Bug Tracker application, covering unit tests, integration tests, and testing best practices.

## Testing Pyramid

```
        /\
       /  \
      / E2E \
     /--------\
    /Integration\
   /--------------\
  /   Unit Tests   \
 /------------------\
```

Our testing strategy follows the testing pyramid principle:
- **70% Unit Tests**: Fast, isolated tests for individual functions and components
- **20% Integration Tests**: Tests for API endpoints and component interactions
- **10% E2E Tests**: Full user flow tests (can be added with Cypress/Playwright)

## Unit Testing

### Backend Unit Tests

**Location**: `server/tests/unit/`

**What We Test**:
1. **Validation Functions** (`validators.test.js`)
   - Input validation logic
   - Edge cases and boundary conditions
   - Error message accuracy

**Example**:
```javascript
describe('validateTitle', () => {
  test('should pass with valid title', () => {
    const result = validateTitle('Valid Bug Title');
    expect(result.isValid).toBe(true);
  });
  
  test('should fail with title too short', () => {
    const result = validateTitle('AB');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('at least 3 characters');
  });
});
```

**Coverage Goals**:
- Statements: 90%+
- Branches: 85%+
- Functions: 90%+

### Frontend Unit Tests

**Location**: `client/src/components/*.test.jsx`

**What We Test**:
1. **Component Rendering**
   - Components render without crashing
   - Correct elements are displayed
   - Props are handled correctly

2. **User Interactions**
   - Button clicks
   - Form submissions
   - Input changes

3. **Conditional Rendering**
   - Loading states
   - Error states
   - Empty states

**Example - BugForm.test.jsx**:
```javascript
test('validates title field', async () => {
  render(<BugForm onSubmit={mockOnSubmit} />);
  
  const submitButton = screen.getByRole('button', { name: /report bug/i });
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(screen.getByText(/title must be at least 3 characters/i))
      .toBeInTheDocument();
  });
  
  expect(mockOnSubmit).not.toHaveBeenCalled();
});
```

**Testing Utilities**:
- `@testing-library/react`: Component testing
- `@testing-library/user-event`: Simulating user interactions
- `@testing-library/jest-dom`: Custom matchers

## Integration Testing

### Backend Integration Tests

**Location**: `server/tests/integration/`

**What We Test**:
1. **API Endpoints** (`bugRoutes.test.js`)
   - HTTP methods (GET, POST, PUT, DELETE)
   - Request/response formats
   - Status codes
   - Database operations

**Example**:
```javascript
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
  });
});
```

**Tools**:
- `supertest`: HTTP assertions
- `mongodb-memory-server`: In-memory database for testing

**Benefits**:
- No need for separate test database
- Fast test execution
- Isolated test environment
- Automatic cleanup

### Frontend Integration Tests

**What We Test**:
1. **Component Interactions**
   - Parent-child component communication
   - State management across components
   - Event propagation

2. **API Integration**
   - Mock API calls
   - Handle loading states
   - Handle error responses

**Example - BugItem.test.jsx**:
```javascript
test('calls onUpdate when status changes', async () => {
  render(
    <BugItem
      bug={mockBug}
      onUpdate={mockOnUpdate}
      onDelete={mockOnDelete}
    />
  );
  
  const statusSelect = screen.getByRole('combobox');
  await userEvent.selectOptions(statusSelect, 'in-progress');
  
  expect(mockOnUpdate).toHaveBeenCalledWith('123', { 
    status: 'in-progress' 
  });
});
```

## Test Organization

### File Structure

```
server/tests/
├── setup.js                    # Global test setup
├── unit/
│   └── validators.test.js      # Unit tests for validators
└── integration/
    └── bugRoutes.test.js       # Integration tests for API

client/src/
├── tests/
│   ├── setup.js                # Global test setup
│   └── __mocks__/
│       └── fileMock.js         # Mock for static assets
└── components/
    ├── BugForm.jsx
    ├── BugForm.test.jsx        # Tests alongside components
    ├── BugList.jsx
    └── BugList.test.jsx
```

### Naming Conventions

- Test files: `*.test.js` or `*.test.jsx`
- Test suites: `describe('ComponentName', () => {})`
- Test cases: `test('should do something', () => {})`
- Mock functions: `mockFunctionName`

## Mocking Strategies

### 1. Database Mocking

Using MongoDB Memory Server:
```javascript
// server/tests/setup.js
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
```

### 2. API Mocking

```javascript
// Mock axios in tests
jest.mock('axios');

test('fetches bugs successfully', async () => {
  axios.get.mockResolvedValue({
    data: { data: [{ id: 1, title: 'Bug 1' }] }
  });
  
  const bugs = await fetchBugs();
  expect(bugs).toHaveLength(1);
});
```

### 3. Function Mocking

```javascript
const mockOnSubmit = jest.fn();

test('calls onSubmit with form data', () => {
  render(<BugForm onSubmit={mockOnSubmit} />);
  // ... fill form and submit
  expect(mockOnSubmit).toHaveBeenCalledWith(expectedData);
});
```

## Test Coverage

### Running Coverage Reports

```bash
# Server coverage
cd server && npm run test:coverage

# Client coverage
cd client && npm test -- --coverage
```

### Coverage Thresholds

Configured in `jest.config.js`:
```javascript
coverageThreshold: {
  global: {
    statements: 70,
    branches: 60,
    functions: 70,
    lines: 70
  }
}
```

### Interpreting Coverage

- **Statements**: % of code statements executed
- **Branches**: % of conditional branches tested
- **Functions**: % of functions called
- **Lines**: % of code lines executed

**Example Coverage Report**:
```
File                | % Stmts | % Branch | % Funcs | % Lines
--------------------|---------|----------|---------|--------
validators.js       |   95.45 |    88.89 |     100 |   95.24
bugController.js    |   85.71 |    75.00 |   83.33 |   85.00
```

## Best Practices

### 1. Test Independence

Each test should be independent and not rely on other tests:
```javascript
// ✅ Good
test('creates a bug', async () => {
  const bug = await Bug.create(validBugData);
  expect(bug).toBeDefined();
});

// ❌ Bad - relies on previous test
test('updates the bug', async () => {
  // Assumes bug from previous test exists
});
```

### 2. Clear Test Names

```javascript
// ✅ Good - descriptive
test('should return 404 when bug does not exist', () => {});

// ❌ Bad - vague
test('bug not found', () => {});
```

### 3. Arrange-Act-Assert Pattern

```javascript
test('validates form data', () => {
  // Arrange
  const invalidData = { title: 'AB' };
  
  // Act
  const result = validateBugData(invalidData);
  
  // Assert
  expect(result.isValid).toBe(false);
  expect(result.errors).toContain('Title must be at least 3 characters');
});
```

### 4. Test Edge Cases

```javascript
describe('validateTitle', () => {
  test('handles empty string', () => {});
  test('handles whitespace only', () => {});
  test('handles exactly 3 characters', () => {});
  test('handles exactly 100 characters', () => {});
  test('handles 101 characters', () => {});
  test('handles null', () => {});
  test('handles undefined', () => {});
  test('handles non-string types', () => {});
});
```

### 5. Cleanup After Tests

```javascript
afterEach(async () => {
  // Clear database
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
  
  // Clear mocks
  jest.clearAllMocks();
});
```

### 6. Use Test Data Factories

```javascript
// testHelpers.js
const createMockBug = (overrides = {}) => ({
  _id: '123',
  title: 'Test Bug',
  description: 'Test description',
  status: 'open',
  priority: 'medium',
  reportedBy: 'Tester',
  createdAt: new Date().toISOString(),
  ...overrides
});

// In tests
const bug = createMockBug({ priority: 'high' });
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm run install-all
      
      - name: Run tests
        run: npm test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

## Future Enhancements

### 1. End-to-End Testing

Add Cypress or Playwright for E2E tests:
```javascript
// cypress/e2e/bug-tracker.cy.js
describe('Bug Tracker E2E', () => {
  it('creates a new bug', () => {
    cy.visit('http://localhost:3000');
    cy.get('[name="title"]').type('New Bug');
    cy.get('[name="description"]').type('Bug description');
    cy.get('[name="reportedBy"]').type('John Doe');
    cy.get('button[type="submit"]').click();
    cy.contains('New Bug').should('be.visible');
  });
});
```

### 2. Visual Regression Testing

Use tools like Percy or Chromatic:
```javascript
import { percySnapshot } from '@percy/puppeteer';

test('bug list visual regression', async () => {
  await page.goto('http://localhost:3000');
  await percySnapshot(page, 'Bug List');
});
```

### 3. Performance Testing

```javascript
test('loads bugs in under 1 second', async () => {
  const start = Date.now();
  await fetchBugs();
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(1000);
});
```

### 4. Accessibility Testing

```javascript
import { axe, toHaveNoViolations } from 'jest-axe';

test('bug form is accessible', async () => {
  const { container } = render(<BugForm onSubmit={jest.fn()} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Troubleshooting Tests

### Common Issues

1. **Tests timeout**: Increase timeout in jest.config.js
2. **Database not cleaning**: Check afterEach cleanup
3. **Async issues**: Use async/await or waitFor
4. **Mock not working**: Ensure mock is before import

### Debugging Tests

```bash
# Run single test file
npm test -- validators.test.js

# Run tests matching pattern
npm test -- --testNamePattern="validates title"

# Run with verbose output
npm test -- --verbose

# Debug in VS Code
# Set breakpoint and use "Debug Tests" configuration
```

## Conclusion

This testing strategy ensures:
- ✅ High code quality
- ✅ Confidence in refactoring
- ✅ Early bug detection
- ✅ Documentation through tests
- ✅ Maintainable codebase

Remember: **Good tests are investments, not expenses!**
