module.exports = {
  server: {
    address: '127.0.0.1',
    'allow-cors': true,
    'base-path': '/',
    'callback-address': '127.0.0.1',
    'callback-port': 4723,
    'debug-log-spacing': true,
    'default-capabilities': {
      platformName: 'iOS',
      'appium:platformVersion': '17.0',
      'appium:deviceName': 'iPhone 16 Plus',
      'appium:automationName': 'XCUITest',
      'appium:udid': 'B6C04136-0085-4E41-99C3-A1025B8F492C',
      'appium:app': '/Users/shinlee/Library/Developer/Xcode/DerivedData/ToDoList-fedlpydtrbrwzgcxfjummcutwynt/Build/Products/ToDoList.app', // Path to your built app, // Update this path to your built app
      'appium:noReset': true,
      'appium:fullReset': false,
      'appium:autoAcceptAlerts': true,
      'appium:simulator': true
    },
    driver: {
      xcuitest: {

      },
    },
    'keep-alive-timeout': 600,
    'local-timezone': true,
    log: '/tmp/appium.log',
    'log-level': 'info',
    'log-no-colors': false,
    'log-timestamp': true,
    'long-stacktrace': false,
    'no-perms-check': false,
    nodeconfig: {

    },
    plugin: {
      images: {

      },
    },
    port: 4723,
    'relaxed-security': false,
    'session-override': false,
    'strict-caps': true,
    tmp: '/tmp',
    'trace-dir': '/tmp/appium-instruments',
    'use-drivers': ['xcuitest']
  },
};