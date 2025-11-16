# Installation Commands

Run these commands in order to set up the Bug Tracker application:

## 1. Install Root Dependencies

```bash
npm install
```

## 2. Install Server Dependencies

```bash
npm install --prefix server express mongoose cors dotenv express-validator
npm install --prefix server --save-dev jest supertest nodemon mongodb-memory-server
```

Or navigate to server folder:
```bash
cd server
npm install
cd ..
```

## 3. Install Client Dependencies

```bash
npm install --prefix client react react-dom axios
npm install --prefix client --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @babel/preset-react @babel/preset-env babel-jest react-scripts
```

Or navigate to client folder:
```bash
cd client
npm install
cd ..
```

## 4. Verify Installation

```bash
# Check if all node_modules exist
dir server\node_modules
dir client\node_modules

# Check package versions
npm list --prefix server --depth=0
npm list --prefix client --depth=0
```

## 5. Run Tests (After Installation)

```bash
# Test server
npm test --prefix server

# Test client  
npm test --prefix client -- --watchAll=false

# Or use root scripts
npm run test:server
npm run test:client
```

## 6. Start Application

```bash
# Make sure MongoDB is running first
mongod

# Then start the application
npm run dev
```

## Quick Install (All at Once)

```bash
npm install && npm install --prefix server && npm install --prefix client
```

## Troubleshooting

If you encounter issues:

1. **Clear npm cache**:
```bash
npm cache clean --force
```

2. **Delete node_modules and reinstall**:
```bash
rmdir /s /q node_modules
rmdir /s /q server\node_modules
rmdir /s /q client\node_modules
npm install && npm install --prefix server && npm install --prefix client
```

3. **Check Node version** (should be 18+):
```bash
node --version
```

4. **Update npm**:
```bash
npm install -g npm@latest
```
