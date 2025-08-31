import { Page, expect } from '@playwright/test';
import { TestConfig } from '../config/test-config';

export class TestUtils {
    /**
     * Rastgele string oluştur
     */
    static generateRandomString(length: number = 8): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Rastgele email oluştur
     */
    static generateRandomEmail(): string {
        const randomString = this.generateRandomString(8);
        return `${randomString}@test.com`;
    }

    /**
     * Sayfa yüklendiğini bekle
     */
    static async waitForPageLoad(page: Page): Promise<void> {
        await page.waitForLoadState('domcontentloaded', { timeout: TestConfig.navigationTimeout });
    }

    /**
     * Screenshot al ve kaydet
     */
    static async takeScreenshot(page: Page, name: string): Promise<void> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${name}_${timestamp}.png`;
        await page.screenshot({ 
            path: `${TestConfig.screenshotSettings.path}${fileName}`,
            fullPage: TestConfig.screenshotSettings.fullPage 
        });
    }

    /**
     * Element görünür olana kadar bekle
     */
    static async waitForElementVisible(page: Page, selector: string, timeout?: number): Promise<void> {
        await page.locator(selector).waitFor({ 
            state: 'visible', 
            timeout: timeout || TestConfig.defaultTimeout 
        });
    }

    /**
     * URL'nin doğru olduğunu kontrol et
     */
    static async assertUrl(page: Page, expectedUrl: string): Promise<void> {
        await expect(page).toHaveURL(expectedUrl);
    }

    /**
     * Sayfa başlığının doğru olduğunu kontrol et
     */
    static async assertTitle(page: Page, expectedTitle: string): Promise<void> {
        await expect(page).toHaveTitle(expectedTitle);
    }

    /**
     * Test verilerini temizle (her test sonrası)
     */
    static async cleanupTestData(page: Page): Promise<void> {
        // TodoMVC için tüm todo'ları sil
        const todoItems = page.locator('.todo-list li');
        const count = await todoItems.count();
        
        for (let i = 0; i < count; i++) {
            await todoItems.first().hover();
            await todoItems.first().locator('.destroy').click();
        }
    }

    /**
     * Test başarısız olduğunda otomatik screenshot al
     */
    static async handleTestFailure(page: Page, testName: string): Promise<void> {
        await this.takeScreenshot(page, `failure_${testName}`);
    }
} 