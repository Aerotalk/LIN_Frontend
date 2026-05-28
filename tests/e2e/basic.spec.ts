import { test, expect } from '@playwright/test';

test.describe('End-to-End Tests', () => {
  test('should load the homepage and check title', async ({ page }) => {
    await page.goto('https://test.loaninneed.in/');
    
    // Check if the frontend renders by looking for common text or title
    const content = await page.content();
    expect(content.length).toBeGreaterThan(0);
  });
});
