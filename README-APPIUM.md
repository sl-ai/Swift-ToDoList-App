# Appium Testing Setup for ToDo List iOS App

This document provides comprehensive setup and usage instructions for running Appium tests on your Swift ToDo List iOS application.

## Prerequisites

### System Requirements
- macOS (required for iOS development and testing)
- Xcode 14.0 or later
- iOS Simulator or physical iOS device
- Node.js 16.0 or later
- npm or yarn package manager

### Development Tools
- Xcode with iOS development capabilities
- iOS Simulator (recommended for testing)
- Command Line Tools for Xcode

## Installation

### 1. Install Node.js Dependencies

```bash
cd Swift-ToDoList-App
npm install
```

### 2. Install Appium Globally

```bash
npm install -g appium
```

### 3. Install Appium Doctor (Optional but Recommended)

```bash
npm install -g appium-doctor
```

### 4. Verify Installation

```bash
appium --version
appium-doctor
```

## Configuration

### 1. Build Your iOS App

First, build your ToDo List app in Xcode:

1. Open `ToDoList.xcodeproj` in Xcode
2. Select your target device (simulator or physical device)
3. Build the project (⌘+B)
4. Note the path to the built `.app` file

### 2. Update Appium Configuration

Edit `appium.config.js` and update the following:

```javascript
capabilities: [{
  platformName: 'iOS',
  'appium:platformVersion': '17.0', // Update to match your iOS version
  'appium:deviceName': 'iPhone 15 Pro', // Update to match your device
  'appium:app': './path/to/your/ToDoList.app', // Update path to your built app
  // ... other settings
}]
```

### 3. Device-Specific Configuration

#### For iOS Simulator:
```javascript
capabilities: [{
  platformName: 'iOS',
  'appium:platformVersion': '17.0',
  'appium:deviceName': 'iPhone 15 Pro',
  'appium:automationName': 'XCUITest',
  'appium:app': './ToDoList.app', // Simulator .app file
  'appium:simulator': true
}]
```

#### For Physical iOS Device:
```javascript
capabilities: [{
  platformName: 'iOS',
  'appium:platformVersion': '17.0',
  'appium:deviceName': 'iPhone 15 Pro',
  'appium:automationName': 'XCUITest',
  'appium:app': './ToDoList.ipa', // Device .ipa file
  'appium:udid': 'your-device-udid', // Add your device UDID
  'appium:xcodeOrgId': 'your-team-id', // Add your team ID
  'appium:xcodeSigningId': 'iPhone Developer' // Add signing identity
}]
```

## Running Tests

### 1. Start Appium Server

```bash
# Start Appium server in background
npm run appium

# Or start manually
appium --base-path /
```

### 2. Run All Tests

```bash
npm test
```

### 3. Run Specific Test Suites

```bash
# Home screen tests only
npm run test:home

# Reminder management tests only
npm run test:reminder

```

### 4. Run Individual Test Files

```bash
# Using mocha directly
npx mocha tests/home.test.js --timeout 60000
npx mocha tests/reminder.test.js --timeout 60000
```

## Test Structure

### Test Files

- **`tests/home.test.js`** - Home screen functionality tests
- **`tests/reminder.test.js`** - Reminder management tests
- **`tests/utils/test-helper.js`** - Common test utilities

### Test Categories

#### Home Screen Tests
- Navigation and title display
- Empty state handling
- Add section functionality
- Grid and list layout display
- Performance testing

#### Reminder Management Tests
- Reminder list navigation
- Creating new reminders
- Marking reminders as complete
- Editing reminder details
- Deleting reminders
- Date and time handling

## Accessibility Identifiers

The tests use accessibility identifiers to locate UI elements. Ensure your SwiftUI views have proper accessibility labels:

```swift
// Example: Adding accessibility identifiers
Button("Add Section", systemImage: "plus", action: addSection)
    .accessibilityIdentifier("Add Section")

Text("To Do List")
    .accessibilityIdentifier("To Do List")

TextField("Section Name", text: $sectionName)
    .accessibilityIdentifier("SectionNameInput")
```

### Required Accessibility Identifiers

#### Home Screen
- `"To Do List"` - Navigation title
- `"Add Section"` - Add section button
- `"Reminders"` - Section header
- `"No Reminders"` - Empty state label
- `"Add Reminder"` - Empty state button

#### Reminder List
- `"ReminderListView"` - Reminder list view
- `"ReminderRowView"` - Individual reminder rows
- `"CompletionCheckbox"` - Completion checkboxes
- `"DateLabel"` - Date display labels

## Troubleshooting

### Common Issues

#### 1. Appium Server Won't Start
```bash
# Check if port 4723 is available
lsof -i :4723

# Kill existing process if needed
kill -9 <PID>
```

#### 2. iOS Simulator Issues
```bash
# Reset iOS Simulator
xcrun simctl erase all

# List available simulators
xcrun simctl list devices
```

#### 3. App Build Issues
- Ensure Xcode project builds successfully
- Check signing and provisioning profiles
- Verify target device compatibility

#### 4. Test Element Not Found
- Verify accessibility identifiers are set correctly
- Check if elements are visible on screen
- Use Appium Inspector to inspect element hierarchy

### Debug Mode

Enable debug logging:

```bash
# Start Appium with debug logging
appium --log appium-debug.log --log-level debug

# Run tests with verbose output
npm test -- --verbose
```

### Screenshots

Tests automatically capture screenshots on failures. Check the `screenshots/` directory for debugging.

## Continuous Integration

### GitHub Actions Example

```yaml
name: Appium Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: macos-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Install Appium
      run: npm install -g appium
      
    - name: Start Appium
      run: appium --base-path / &
      
    - name: Run tests
      run: npm test
```

## Best Practices

### 1. Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Keep tests independent and isolated

### 2. Element Locators
- Prefer accessibility identifiers over XPath
- Use unique and stable identifiers
- Avoid relying on text content for element location

### 3. Test Data
- Create test data as needed
- Clean up test data after tests
- Use meaningful test data names

### 4. Error Handling
- Implement proper error handling in tests
- Use try-catch blocks for optional UI elements
- Provide meaningful error messages

### 5. Performance
- Set appropriate timeouts
- Minimize unnecessary waits
- Use efficient element location strategies

## Additional Resources

- [Appium Documentation](http://appium.io/docs/en/about-appium/intro/)
- [WebDriverIO Documentation](https://webdriver.io/)
- [iOS XCUITest Framework](https://developer.apple.com/documentation/xctest/user_interface_tests)
- [SwiftUI Accessibility](https://developer.apple.com/documentation/swiftui/view-accessibility)

## Support

For issues specific to your app:
1. Check the troubleshooting section above
2. Review Appium logs for error details
3. Verify accessibility identifiers are correctly set
4. Test with Appium Inspector to debug element location

For general Appium issues:
- [Appium GitHub Issues](https://github.com/appium/appium/issues)
- [Appium Community](https://discuss.appium.io/)
