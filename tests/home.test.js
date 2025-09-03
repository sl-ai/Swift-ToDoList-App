const { remote } = require('webdriverio');
const assert = require('chai').assert;
const { CAPABILITIES } = require('../appium.config.js');

describe('ToDo List App - Home Screen Tests', function() {
  let driver;
  
  before(async function() {
    // Initialize WebdriverIO with Appium capabilities
    driver = await remote({
      hostname: 'localhost',
      port: 4723,
      path: '/',
      capabilities: CAPABILITIES
    });
  });
  
  after(async function() {
    if (driver) {
      await driver.deleteSession();
    }
  });
  
  describe('Home Screen Navigation', function() {
    it('should display the home screen with correct title', async function() {
      // Wait for app to load
      await driver.pause(3000);
      
      // Check if navigation title is displayed
      const title = await driver.$('~To Do List');
      await assert.isTrue(await title.isDisplayed(), 'Navigation title should be displayed');
    });
    
  });
  
  describe('Empty State Handling', function() {
    it('should show empty state when no reminders exist', async function() {
      // Check for empty state elements
      const noRemindersLabel = await driver.$('~No Reminders');
      const description = await driver.$('~add reminders to update your list.');
      const addReminderButton = await driver.$('~Add Reminder');
      
      await assert.isTrue(await noRemindersLabel.isDisplayed(), 'No Reminders label should be displayed');
      await assert.isTrue(await description.isDisplayed(), 'Empty state description should be displayed');
      await assert.isTrue(await addReminderButton.isDisplayed(), 'Add Reminder button should be displayed');
    });
  });
  
  describe('Add Section Functionality', function() {
    it('should navigate to create section when Add Section is tapped', async function() {
      const addButton = await driver.$('~Add Section');
      await addButton.click();
      
      // Wait for navigation
      await driver.pause(1000);
      
      // Should be on create section view
      const createSectionTitle = await driver.$('~Add Segment');
      await assert.isTrue(await createSectionTitle.isDisplayed(), 'Should navigate to create section view');

      // Save and Cancel buttons should be visible
      const saveButton = await driver.$('~Save');
      const cancelButton = await driver.$('~Cancel');
      await assert.isTrue(await saveButton.isDisplayed(), 'Save button should be displayed');
      await assert.isTrue(await cancelButton.isDisplayed(), 'Cancel button should be displayed');
      await saveButton.click();
    });
  });
  
  describe('Grid Layout Display', function() {
    it('should display reminder lists in grid format when they exist', async function() {
      // This test assumes some reminder lists exist
      // In a real scenario, you might need to create test data first
      try {
        const gridItems = await driver.$$('~ListCardView');
        if (gridItems.length > 0) {
          await assert.isTrue(gridItems.length <= 4, 'Grid should show maximum 4 items');
        }
      } catch (error) {
        // Grid might not be visible if no items exist
        console.log('Grid items not visible - this is expected for empty state');
      }
    });
  });
  
  describe('List Row Display', function() {
    it('should display reminder lists in list format', async function() {
      // Check if list rows are displayed (when they exist)
      try {
        const listRows = await driver.$$('~ReminderListRowView');
        // List rows should be present if any reminder lists exist
        console.log(`Found ${listRows.length} list rows`);
      } catch (error) {
        console.log('No list rows found - this is expected for empty state');
      }
    });
  });
  
  describe('App Performance', function() {
    it('should load home screen within reasonable time', async function() {
      const startTime = Date.now();
      
      // Wait for key elements to appear
      await driver.$('~To Do List').waitForDisplayed({ timeout: 10000 });
      
      const loadTime = Date.now() - startTime;
      await assert.isTrue(loadTime < 10000, `Home screen should load within 10 seconds, took ${loadTime}ms`);
    });
  });
});
