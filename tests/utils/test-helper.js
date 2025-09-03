/**
 * Test Helper Utilities for ToDo List App Appium Tests
 * Common functions and utilities used across test files
 */

class TestHelper {
  constructor(driver) {
    this.driver = driver;
  }
  
  /**
   * Wait for an element to be displayed with timeout
   * @param {string} accessibilityId - Accessibility identifier
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<boolean>} - Whether element is displayed
   */
  async waitForElement(accessibilityId, timeout = 10000) {
    try {
      await this.driver.waitUntil(async () => {
        try {
          const element = await this.driver.$(`~${accessibilityId}`);
          return await element.isDisplayed();
        } catch {
          return false;
        }
      }, { timeout, timeoutMsg: `Element ${accessibilityId} did not appear within ${timeout}ms` });
      return true;
    } catch (error) {
      console.log(`Element ${accessibilityId} not found within ${timeout}ms`);
      return false;
    }
  }
  
  /**
   * Safe click on element with retry
   * @param {string} accessibilityId - Accessibility identifier
   * @param {number} maxRetries - Maximum retry attempts
   * @returns {Promise<boolean>} - Whether click was successful
   */
  async safeClick(accessibilityId, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const element = await this.driver.$(`~${accessibilityId}`);
        if (await element.isDisplayed()) {
          await element.click();
          return true;
        }
      } catch (error) {
        console.log(`Click attempt ${i + 1} failed for ${accessibilityId}`);
        if (i === maxRetries - 1) throw error;
        await this.driver.pause(1000);
      }
    }
    return false;
  }
  
  /**
   * Safe input text with validation
   * @param {string} accessibilityId - Accessibility identifier
   * @param {string} text - Text to input
   * @returns {Promise<boolean>} - Whether input was successful
   */
  async safeInput(accessibilityId, text) {
    try {
      const element = await this.driver.$(`~${accessibilityId}`);
      if (await element.isDisplayed()) {
        await element.clearValue();
        await element.setValue(text);
        
        // Verify input
        const inputValue = await element.getValue();
        return inputValue === text;
      }
      return false;
    } catch (error) {
      console.log(`Input failed for ${accessibilityId}: ${error.message}`);
      return false;
    }
  }
  
  /**
   * Navigate back to home screen
   * @returns {Promise<boolean>} - Whether navigation was successful
   */
  async navigateToHome() {
    try {
      // Try multiple ways to get back to home
      const backButton = await this.driver.$('~Back');
      if (await backButton.isDisplayed()) {
        await backButton.click();
        await this.driver.pause(1000);
        return true;
      }
      
      // Check if we're already on home
      const homeTitle = await this.driver.$('~To Do List');
      if (await homeTitle.isDisplayed()) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.log('Navigation to home failed:', error.message);
      return false;
    }
  }
  
  /**
   * Create a test reminder list for testing
   * @param {string} name - Name for the reminder list
   * @returns {Promise<boolean>} - Whether creation was successful
   */
  async createTestReminderList(name = 'Test List') {
    try {
      // Navigate to home first
      await this.navigateToHome();
      
      // Click Add Section
      const addButton = await this.driver.$('~Add Section');
      if (await addButton.isDisplayed()) {
        await addButton.click();
        await this.driver.pause(1000);
        
        // Input name if field exists
        const nameInput = await this.driver.$('~SectionNameInput');
        if (await nameInput.isDisplayed()) {
          await this.safeInput('SectionNameInput', name);
        }
        
        // Save the section
        const saveButton = await this.driver.$('~Save');
        if (await saveButton.isDisplayed()) {
          await saveButton.click();
          await this.driver.pause(1000);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log('Creating test reminder list failed:', error.message);
      return false;
    }
  }
  
  /**
   * Check if app is in expected state
   * @param {string} expectedScreen - Expected screen identifier
   * @returns {Promise<boolean>} - Whether app is in expected state
   */
  async isOnScreen(expectedScreen) {
    try {
      const element = await this.driver.$(`~${expectedScreen}`);
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }
  
  /**
   * Take screenshot for debugging
   * @param {string} name - Screenshot name
   * @returns {Promise<string>} - Screenshot path
   */
  async takeScreenshot(name) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `screenshot-${name}-${timestamp}.png`;
      const screenshot = await this.driver.saveScreenshot(`./screenshots/${filename}`);
      console.log(`Screenshot saved: ${screenshot}`);
      return screenshot;
    } catch (error) {
      console.log('Screenshot failed:', error.message);
      return null;
    }
  }
  
  /**
   * Wait for app to be ready
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<boolean>} - Whether app is ready
   */
  async waitForAppReady(timeout = 15000) {
    try {
      await this.driver.waitUntil(async () => {
        try {
          // Check for key elements that indicate app is loaded
          const homeTitle = await this.driver.$('~To Do List');
          return await homeTitle.isDisplayed();
        } catch {
          return false;
        }
      }, { timeout, timeoutMsg: `App did not load within ${timeout}ms` });
      return true;
    } catch (error) {
      console.log('App not ready within timeout');
      return false;
    }
  }
  
  /**
   * Get element count by accessibility identifier
   * @param {string} accessibilityId - Accessibility identifier
   * @returns {Promise<number>} - Number of elements found
   */
  async getElementCount(accessibilityId) {
    try {
      const elements = await this.driver.$$(`~${accessibilityId}`);
      return elements.length;
    } catch {
      return 0;
    }
  }
  
  /**
   * Scroll to find element
   * @param {string} accessibilityId - Accessibility identifier
   * @param {string} direction - Scroll direction ('up', 'down', 'left', 'right')
   * @returns {Promise<boolean>} - Whether element was found
   */
  async scrollToElement(accessibilityId, direction = 'down') {
    try {
      const element = await this.driver.$(`~${accessibilityId}`);
      if (await element.isDisplayed()) {
        return true;
      }
      
      // Scroll in specified direction
      await this.driver.executeScript('mobile: scroll', {
        direction: direction,
        percent: 0.5
      });
      
      await this.driver.pause(1000);
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }
}

module.exports = TestHelper;
