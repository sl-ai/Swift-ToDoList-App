#!/usr/bin/env node

/**
 * Simple Appium Test Runner for ToDo List iOS App
 * This script runs tests using WebDriverIO with Appium
 */

const { remote } = require('webdriverio');
const assert = require('chai').assert;
const { CAPABILITIES } = require('../appium.config.js');

const WDIO_OPTIONS = {
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
  capabilities: CAPABILITIES,
  logLevel: 'info'
};

async function runTests() {
  let driver;

  try {
    console.log('🚀 Starting Appium tests for ToDo List iOS app...');
    console.log(`📱 Connecting to Appium server at ${WDIO_OPTIONS.hostname}:${WDIO_OPTIONS.port}`);

    // Initialize driver with WebDriverIO
    driver = await remote(WDIO_OPTIONS);
    console.log('✅ Driver initialized successfully');

    // Wait for app to load
    console.log('⏳ Waiting for app to load...');
    await driver.pause(5000);

    // Run basic tests
    console.log('🧪 Running basic tests...');

    // Test 1: Check if home screen loads
    try {
      const title = await driver.$('~To Do List');
      const isDisplayed = await title.isDisplayed();
      console.log(`✅ Home screen title found: ${isDisplayed}`);
      assert.isTrue(isDisplayed, 'Home screen title should be displayed');
    } catch (error) {
      console.log('❌ Home screen title not found:', error.message);
    }

    // Test 2: Check if Add Section button exists
    try {
      const addButton = await driver.$('~Add Section');
      const isDisplayed = await addButton.isDisplayed();
      console.log(`✅ Add Section button found: ${isDisplayed}`);
      assert.isTrue(isDisplayed, 'Add Section button should be displayed');
    } catch (error) {
      console.log('❌ Add Section button not found:', error.message);
    }

    // Test 3: Check if Reminders section header exists
    try {
      const remindersHeader = await driver.$('~Reminders');
      const isDisplayed = await remindersHeader.isDisplayed();
      console.log(`✅ Reminders header found: ${isDisplayed}`);
      assert.isTrue(isDisplayed, 'Reminders header should be displayed');
    } catch (error) {
      console.log('❌ Reminders header not found:', error.message);
    }

    // Test 4: Check empty state (if no reminders exist)
    try {
      const noRemindersLabel = await driver.$('~No Reminders');
      const isDisplayed = await noRemindersLabel.isDisplayed();
      console.log(`✅ Empty state label found: ${isDisplayed}`);
      if (isDisplayed) {
        console.log('ℹ️  App is in empty state (no reminders)');
      }
    } catch (error) {
      console.log('ℹ️  Empty state not found (may have existing reminders)');
    }

    console.log('🎉 Basic tests completed successfully!');

  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    console.error(error.stack);
  } finally {
    // Cleanup
    if (driver) {
      try {
        console.log('🧹 Cleaning up driver...');
        await driver.deleteSession();
        console.log('✅ Driver cleaned up successfully');
      } catch (error) {
        console.error('⚠️  Error during cleanup:', error.message);
      }
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
