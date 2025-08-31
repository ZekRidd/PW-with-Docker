import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/LoginPage';

// Basit fixture örnekleri
test.describe('Simple Fixture Examples', () => {
    
    test('should use page fixture', async ({ page }) => {
        // page fixture'ı Playwright'ın built-in fixture'ı
        await page.goto('https://demo.playwright.dev/todomvc');
        const todoPage = new TodoPage(page);
        await todoPage.addTodo('Simple Fixture Test');
        await todoPage.assertTodoExists('Simple Fixture Test');
    });

    test('should use request fixture for API test', async ({ request }) => {
        // request fixture'ı API testleri için
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        expect(response.status()).toBe(200);
        
        const data = await response.json();
        expect(data.id).toBe(1);
        expect(data).toHaveProperty('title');
    });

    test('should use multiple fixtures', async ({ page, request }) => {
        // Hem page hem request fixture'ını kullan
        await page.goto('https://demo.playwright.dev/todomvc');
        
        // API test
        const apiResponse = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        expect(apiResponse.status()).toBe(200);
        
        // UI test
        const todoPage = new TodoPage(page);
        await todoPage.addTodo('Multi Fixture Test');
        await todoPage.assertTodoExists('Multi Fixture Test');
    });
}); 