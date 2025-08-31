import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a URL
     */
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    /**
     * Wait for page to load
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    }

    /**
     * Get page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get current URL
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    /**
     * Take screenshot
     */
    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }

    /**
     * Wait for element to be visible
     */
    async waitForElement(locator: Locator, timeout: number = 5000) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    /**
     * Click on element
     */
    async clickElement(locator: Locator) {
        await this.waitForElement(locator);
        await locator.click();
    }

    /**
     * Fill text in input field
     */
    async fillInput(locator: Locator, text: string) {
        await this.waitForElement(locator);
        await locator.fill(text);
    }

    /**
     * Get text from element
     */
    async getText(locator: Locator): Promise<string> {
        await this.waitForElement(locator);
        return await locator.textContent() || '';
    }

    /**
     * Check if element is visible
     */
    async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    /**
     * Assert element is visible
     */
    async assertElementVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    /**
     * Assert text is present
     */
    async assertTextPresent(locator: Locator, expectedText: string) {
        await expect(locator).toContainText(expectedText);
    }

    /**
     * Assert URL contains text
     */
    async assertUrlContains(expectedText: string) {
        const currentUrl = await this.getCurrentUrl();
        expect(currentUrl).toContain(expectedText);
    }

    /**
     * Assert page title contains text
     */
    async assertTitleContains(expectedText: string) {
        const title = await this.getPageTitle();
        expect(title).toContain(expectedText);
    }
} 