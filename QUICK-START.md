# Quick Start Guide - Appium Testing

Get up and running with Appium tests for your ToDo List iOS app in 5 minutes!

## 🚀 Quick Setup

### 1. Run the Setup Script
```bash
cd Swift-ToDoList-App
./setup-appium.sh
```

This script will:
- Check your system requirements
- Install Node.js dependencies
- Install Appium globally
- Install Appium Doctor
- Create necessary directories

### 2. Build Your App
1. Open `ToDoList.xcodeproj` in Xcode
2. Select iOS Simulator (e.g., iPhone 15 Pro)
3. Build the project (⌘+B)
4. Note the path to the built `.app` file

### 3. Update Configuration
Edit `appium.config.js` and update the app path:
```javascript
'appium:app': './path/to/your/ToDoList.app'
```

### 4. Start Testing!
```bash
# Start Appium server
npm run appium

# In another terminal, run tests
npm test
```

## 🧪 Test Commands

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:home      # Home screen tests
npm run test:reminder  # Reminder management tests
npm run test:create    # Create section tests

# Run individual test files
npx mocha tests/home.test.js --timeout 60000
```

## 🔧 Troubleshooting

### Common Issues

**Appium won't start:**
```bash
# Check if port 4723 is available
lsof -i :4723
# Kill existing process if needed
kill -9 <PID>
```

**Tests can't find elements:**
- Verify your app builds successfully in Xcode
- Check that accessibility identifiers are set correctly
- Use Appium Inspector to debug element location

**iOS Simulator issues:**
```bash
# Reset simulator
xcrun simctl erase all
```

## 📱 Device Configuration

### iOS Simulator (Recommended for testing)
```javascript
capabilities: [{
  platformName: 'iOS',
  'appium:platformVersion': '17.0',
  'appium:deviceName': 'iPhone 15 Pro',
  'appium:automationName': 'XCUITest',
  'appium:app': './ToDoList.app',
  'appium:simulator': true
}]
```

### Physical iOS Device
```javascript
capabilities: [{
  platformName: 'iOS',
  'appium:platformVersion': '17.0',
  'appium:deviceName': 'iPhone 15 Pro',
  'appium:automationName': 'XCUITest',
  'appium:app': './ToDoList.ipa',
  'appium:udid': 'your-device-udid',
  'appium:xcodeOrgId': 'your-team-id'
}]
```

## 📋 What's Tested

- ✅ Home screen navigation and display
- ✅ Empty state handling
- ✅ Add section functionality
- ✅ Reminder creation and management
- ✅ Form validation and input
- ✅ Navigation flows
- ✅ Accessibility features

## 🆘 Need Help?

1. Check the detailed [README-APPIUM.md](README-APPIUM.md)
2. Run `appium-doctor` to diagnose environment issues
3. Check Appium logs for error details
4. Use Appium Inspector to debug element location

## 🎯 Next Steps

After getting the basic tests running:
1. Add more test scenarios
2. Integrate with CI/CD pipeline
3. Add test data management
4. Implement parallel test execution
5. Add performance testing

Happy testing! 🧪✨
