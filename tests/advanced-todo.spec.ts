import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/LoginPage';
import { TestData, TestScenarios } from '../data/test-data';
import { TestUtils } from '../utils/test-utils';
import { TestConfig } from '../config/test-config';

test.describe('Advanced TodoMVC Tests', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await page.goto(TestConfig.todoMvcUrl);
        await TestUtils.waitForPageLoad(page);
    });

    test.describe('Data-Driven Tests', () => {
        // Geçerli todo'ları test et
        for (const todo of TestData.todos.valid) {
            test(`should add valid todo: "${todo}"`, async ({ page }) => {
                await todoPage.addTodo(todo);
                await todoPage.assertTodoExists(todo);
            });
        }

        // Özel karakterli todo'ları test et
        for (const todo of TestData.todos.special) {
            test(`should handle special characters: "${todo}"`, async ({ page }) => {
                await todoPage.addTodo(todo);
                await todoPage.assertTodoExists(todo);
            });
        }
    });

    test.describe('Performance Tests', () => {
        test('should handle large number of todos', async ({ page }) => {
            const todos = TestData.performance.largeTodoList.slice(0, 50); // 50 todo ile test et
            
            for (const todo of todos) {
                await todoPage.addTodo(todo);
            }
            
            await todoPage.assertTodoCount(50);
        });
    });

    test.describe('Edge Cases', () => {
        test('should handle very long todo text', async ({ page }) => {
            const longTodo = 'a'.repeat(1000);
            await todoPage.addTodo(longTodo);
            await todoPage.assertTodoExists(longTodo);
        });

        test('should handle rapid todo additions', async ({ page }) => {
            const todos = ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4', 'Todo 5'];
            
            // Hızlıca ekle
            for (const todo of todos) {
                await todoPage.addTodo(todo);
                await page.waitForTimeout(100); // Kısa bekleme
            }
            
            await todoPage.assertTodoCount(5);
        });
    });

    test.describe('Screenshot Tests', () => {
        test('should take screenshot of todo list', async ({ page }) => {
            // Todo'ları ekle
            await todoPage.addTodo('Screenshot Test 1');
            await todoPage.addTodo('Screenshot Test 2');
            await todoPage.completeTodo('Screenshot Test 1');

            // Screenshot al
            await TestUtils.takeScreenshot(page, 'todo-list-with-items');
            
            // Doğrulama - sadece todo'ların var olduğunu kontrol et
            await todoPage.assertTodoExists('Screenshot Test 1');
            await todoPage.assertTodoExists('Screenshot Test 2');
        });
    });

    test.describe('Error Handling', () => {
        test('should handle network errors gracefully', async ({ page }) => {
            // Network hatalarını simüle et
            await page.route('**/*', route => {
                if (route.request().url().includes('api')) {
                    route.abort();
                } else {
                    route.continue();
                }
            });

            // Normal işlemleri yap
            await todoPage.addTodo('Network Test Todo');
            await todoPage.assertTodoExists('Network Test Todo');
        });
    });
}); 