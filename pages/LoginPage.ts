import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
    // Locators - TodoMVC demo sitesi için
    private readonly newTodoInput: Locator;
    private readonly todoList: Locator;
    private readonly todoItems: Locator;
    private readonly todoToggle: Locator;
    private readonly todoDelete: Locator;
    private readonly clearCompletedButton: Locator;
    private readonly allFilter: Locator;
    private readonly activeFilter: Locator;
    private readonly completedFilter: Locator;
    private readonly todoCount: Locator;

    constructor(page: Page) {
        super(page);
        
        // TodoMVC locator'ları
        this.newTodoInput = page.locator('.new-todo');
        this.todoList = page.locator('.todo-list');
        this.todoItems = page.locator('.todo-list li');
        this.todoToggle = page.locator('.todo-list li .toggle');
        this.todoDelete = page.locator('.todo-list li .destroy');
        this.clearCompletedButton = page.locator('.clear-completed');
        this.allFilter = page.locator('a[href="#/"]');
        this.activeFilter = page.locator('a[href="#/active"]');
        this.completedFilter = page.locator('a[href="#/completed"]');
        this.todoCount = page.locator('.todo-count');
    }

    /**
     * TodoMVC sayfasına git
     */
    async navigateToTodoPage() {
        await this.navigateTo('https://demo.playwright.dev/todomvc');
        await this.waitForPageLoad();
    }

    /**
     * Yeni todo ekle
     */
    async addTodo(todoText: string) {
        await this.fillInput(this.newTodoInput, todoText);
        await this.newTodoInput.press('Enter');
    }

    /**
     * Todo listesini al
     */
    async getTodoItems(): Promise<string[]> {
        const items = await this.todoItems.all();
        const texts: string[] = [];
        for (const item of items) {
            const text = await item.locator('label').textContent();
            if (text) texts.push(text.trim());
        }
        return texts;
    }

    /**
     * Belirli bir todo'yu tamamla
     */
    async completeTodo(todoText: string) {
        const todoItem = this.page.locator('.todo-list li').filter({ hasText: todoText });
        await todoItem.locator('.toggle').click();
    }

    /**
     * Belirli bir todo'yu sil
     */
    async deleteTodo(todoText: string) {
        const todoItem = this.page.locator('.todo-list li').filter({ hasText: todoText });
        await todoItem.hover();
        await todoItem.locator('.destroy').click();
    }

    /**
     * Tüm tamamlanmış todo'ları temizle
     */
    async clearCompleted() {
        await this.clickElement(this.clearCompletedButton);
    }

    /**
     * Tüm todo'ları göster
     */
    async showAllTodos() {
        await this.clickElement(this.allFilter);
    }

    /**
     * Sadece aktif todo'ları göster
     */
    async showActiveTodos() {
        await this.clickElement(this.activeFilter);
    }

    /**
     * Sadece tamamlanmış todo'ları göster
     */
    async showCompletedTodos() {
        await this.clickElement(this.completedFilter);
    }

    /**
     * Kalan todo sayısını al
     */
    async getTodoCount(): Promise<string> {
        return await this.getText(this.todoCount);
    }

    /**
     * Todo sayısının doğru olduğunu kontrol et
     */
    async assertTodoCount(expectedCount: number) {
        const countText = await this.getTodoCount();
        const actualCount = parseInt(countText.match(/\d+/)?.[0] || '0');
        expect(actualCount).toBe(expectedCount);
    }

    /**
     * Belirli bir todo'nun var olduğunu kontrol et
     */
    async assertTodoExists(todoText: string) {
        const todos = await this.getTodoItems();
        expect(todos).toContain(todoText);
    }

    /**
     * Belirli bir todo'nun tamamlandığını kontrol et
     */
    async assertTodoCompleted(todoText: string) {
        const todoItem = this.page.locator('.todo-list li').filter({ hasText: todoText });
        await expect(todoItem).toHaveClass(/completed/);
    }

    /**
     * Sayfa başlığını kontrol et
     */
    async assertPageTitle(expectedTitle: string) {
        const actualTitle = await this.getPageTitle();
        expect(actualTitle).toBe(expectedTitle);
    }

    /**
     * TodoMVC sayfasında olduğunu kontrol et
     */
    async assertOnTodoPage() {
        await this.assertElementVisible(this.newTodoInput);
        await this.assertElementVisible(this.todoList);
    }
} 