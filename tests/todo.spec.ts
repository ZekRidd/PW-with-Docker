import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/LoginPage';

test.describe('TodoMVC Tests', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000); // Her test sonunda 3 saniye bekle
    });

    test('should add a new todo', async ({ page }) => {
        await todoPage.navigateToTodoPage();
        await todoPage.addTodo('Ramazan ogreniyor');
        await todoPage.assertTodoExists('Ramazan ogreniyor');
        await todoPage.assertTodoCount(1);
    });

    test('should add multiple todos', async ({ page }) => {
        await todoPage.navigateToTodoPage();
        await todoPage.addTodo('Learn Playwright');
        await todoPage.addTodo('Write tests');
        await todoPage.addTodo('Run tests');
        await todoPage.assertTodoCount(3);
    });

    test('should complete a todo', async ({ page }) => {
        await todoPage.navigateToTodoPage();
        await todoPage.addTodo('Complete this task');
        await todoPage.completeTodo('Complete this task');
        await todoPage.assertTodoCompleted('Complete this task');
    });

    test('should clear completed todos', async ({ page }) => {
        await todoPage.navigateToTodoPage();
        await todoPage.addTodo('Task 1');
        await todoPage.addTodo('Task 2');
        await todoPage.addTodo('Task 3');
        await todoPage.completeTodo('Task 1');
        await todoPage.completeTodo('Task 2');
        
        await todoPage.clearCompleted();
        await todoPage.assertTodoCount(1);
        await todoPage.assertTodoExists('Task 3');
    });
}); 