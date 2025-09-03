const CAPABILITIES = {
  platformName: 'iOS',
  'appium:platformVersion': '18.6',
  'appium:deviceName': 'iPhone 16 Pro',
  'appium:automationName': 'XCUITest',
  'appium:wdaLocalPort': 8100,
  'appium:app': '/Users/shinlee/Library/Developer/Xcode/DerivedData/ToDoList-fedlpydtrbrwzgcxfjummcutwynt/Build/Products/ToDoList.app',
  'appium:noReset': true,
  'appium:fullReset': false,
  'appium:autoAcceptAlerts': true,
  'appium:simulator': true
};

module.exports = {
  CAPABILITIES,
  server: {
    address: '127.0.0.1',
    'allow-cors': true,
    'base-path': '/',
    'callback-address': '127.0.0.1',
    'callback-port': 4723,
    'debug-log-spacing': true,
    'default-capabilities': CAPABILITIES,
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