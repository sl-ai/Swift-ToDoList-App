# Running Appium Tests with iOS Simulator

## Prerequisites

1. **Xcode** installed and configured
2. **iOS Simulator** available
3. **Node.js** dependencies installed (`npm install`)

## Quick Setup

### 1. Build Your iOS App

First, you need to build your ToDo List app in Xcode:

1. Open `ToDoList.xcodeproj` in Xcode
2. Select iOS Simulator as the target device (e.g., iPhone 15 Pro)
3. Build the project (⌘+B)
4. Note the path to the built `.app` file

### 2. Update App Path

Edit `run-tests.js` and update the app path:

```javascript
const CAPABILITIES = {
  // ... other settings
  'appium:app': '/path/to/your/ToDoList.app', // Update this path
  // ... other settings
};
```

### 3. Start iOS Simulator

```bash
# List available simulators
xcrun simctl list devices available

# Start a simulator (replace with your preferred device)
xcrun simctl boot "iPhone 15 Pro"
```

### 4. Start Appium Server

```bash
# Start Appium server in background
npm run appium

# Or start manually
appium --base-path /
```

### 5. Run Tests

```bash
# Run the simple test runner
npm test

# Or run directly
node run-tests.js
```

## Troubleshooting

### Common Issues

**"Couldn't find property before of /before"**
- ✅ Fixed: Updated configuration to use standalone Appium approach

**"No such file or directory" for .app file**
- Make sure you've built the app in Xcode
- Update the path in `run-tests.js`

**Simulator not found**
- Install iOS Simulator in Xcode
- Use `xcrun simctl list devices` to see available devices

**Appium server won't start**
- Check if port 4723 is available: `lsof -i :4723`
- Kill existing process if needed: `kill -9 <PID>`

### Debug Mode

```bash
# Start Appium with debug logging
appium --log appium-debug.log --log-level debug

# Run tests with verbose output
node run-tests.js
```

## Test Output

The test runner will show:
- ✅ Success messages for found elements
- ❌ Error messages for missing elements
- ℹ️  Informational messages
- 🧹 Cleanup status

## Next Steps

After getting basic tests running:
1. Add more test scenarios
2. Use the Mocha test files for comprehensive testing
3. Integrate with CI/CD pipeline
4. Add test data management

## Support

- Check `README-APPIUM.md` for detailed documentation
- Run `appium-doctor` to diagnose environment issues
- Review Appium logs for error details
