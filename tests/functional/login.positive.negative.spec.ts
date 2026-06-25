// spec: spec/login-test-plan.md
// Plan: Login Test Scenarios

import { test, expect } from '@playwright/test';

test.describe('Login Test Scenarios', () => {
  
  test('Successful login with valid credentials', async ({ page }) => {
    // 1. Open the application URL: https://katalon-demo-cura.herokuapp.com/
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    
    // 2. Click 'Make Appointment' link
    await page.locator('a:has-text("Make Appointment")').click();
    
    // 3. Fill 'Username' with 'John Doe' and 'Password' with 'ThisIsNotAPassword'
    await page.locator('input[name="username"]').fill('John Doe');
    await page.locator('input[name="password"]').fill('ThisIsNotAPassword');
    
    // 4. Click the 'Login' button
    await page.locator('button:has-text("Login")').click();
    
    // Verify: Page navigates to Make Appointment page
    await expect(page).toHaveURL(/.*#appointment/);
    
    // Verify: Element 'h2' contains text 'Make Appointment'
    await expect(page.locator('h2:has-text("Make Appointment")')).toBeVisible();
  });

  test('Prevent login with incorrect credentials', async ({ page }) => {
    // 1. Open the application and click 'Make Appointment'
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await page.locator('a:has-text("Make Appointment")').click();
    
    // 2. Fill 'Username' with 'John Smith' and 'Password' with 'invalid'
    await page.locator('input[name="username"]').fill('John Smith');
    await page.locator('input[name="password"]').fill('invalid');
    
    // 3. Click the 'Login' button
    await page.locator('button:has-text("Login")').click();
    
    // Verify: Error message 'Login failed! Please ensure the username and password are valid.' appears
    await expect(page.locator('text=Login failed! Please ensure the username and password are valid.')).toBeVisible();
  });
});
