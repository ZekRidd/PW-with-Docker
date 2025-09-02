import { test, expect, testSuite } from '../utils/test-hooks';

test.describe('Simple Framework Test', () => {
    // Test suite tamamlandıktan sonra browser'ı kapat
    test.afterAll(async ({ browser }) => {
        await testSuite.afterAll({ browser });
    });

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