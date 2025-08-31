import { test, expect } from '@playwright/test';

test.describe('Simple Framework Test', () => {
    test('should navigate to a website', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc');
        await expect(page).toHaveTitle(/TodoMVC/);
    });

    test('should add a simple todo', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc');
        await page.locator('.new-todo').fill('Test Todo');
        await page.locator('.new-todo').press('Enter');
        await expect(page.locator('.todo-list li')).toContainText('Test Todo');
    });
}); 