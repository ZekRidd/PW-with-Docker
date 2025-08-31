import { test as base, expect } from '@playwright/test';
import { TestUtils } from './test-utils';
import { TestConfig } from '../config/test-config';

// Define custom fixture types
type CustomFixtures = {
    autoScreenshot: (testName: string) => Promise<void>;
    cleanup: () => Promise<void>;
    failureHandler: (testName: string) => Promise<void>;
};

// Test context'i genişlet
export const test = base.extend<CustomFixtures>({
    // Her test için otomatik screenshot
    autoScreenshot: [async ({ page }, use) => {
        await use(async (testName: string) => {
            await TestUtils.takeScreenshot(page, testName);
        });
    }, { scope: 'test' }],

    // Test verilerini temizle
    cleanup: [async ({ page }, use) => {
        await use(async () => {
            await TestUtils.cleanupTestData(page);
        });
    }, { scope: 'test' }],

    // Test başarısızlığında otomatik işlemler
    failureHandler: [async ({ page }, use) => {
        await use(async (testName: string) => {
            await TestUtils.handleTestFailure(page, testName);
        });
    }, { scope: 'test' }]
});

export { expect } from '@playwright/test';

// Global test hooks
test.beforeEach(async ({ page }) => {
    // Her test öncesi sayfa ayarları
    await page.setViewportSize(TestConfig.browserSettings.viewport);
    
    // Console log'ları yakala
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log(`Browser Error: ${msg.text()}`);
        }
    });

    // Network hatalarını yakala
    page.on('pageerror', error => {
        console.log(`Page Error: ${error.message}`);
    });
});

test.afterEach(async ({ page, cleanup, failureHandler }, testInfo) => {
    // Test başarısız olduysa screenshot al
    if (testInfo.status !== testInfo.expectedStatus) {
        await failureHandler(testInfo.title);
    }

    // Test verilerini temizle
    await cleanup();

    // Test sonrası bekleme
    await page.waitForTimeout(2000);
});

// Test grupları için özel hooks
export const testGroup = {
    // Todo testleri için özel setup
    todo: {
        beforeEach: async ({ page }) => {
            await page.goto(TestConfig.todoMvcUrl);
            await TestUtils.waitForPageLoad(page);
        },
        afterEach: async ({ page }) => {
            await TestUtils.cleanupTestData(page);
        }
    },

    // Performance testleri için özel setup
    performance: {
        beforeEach: async ({ page }) => {
            await page.goto(TestConfig.todoMvcUrl);
            await TestUtils.waitForPageLoad(page);
        },
        afterEach: async ({ page }) => {
            // Performance testleri için daha uzun bekleme
            await page.waitForTimeout(5000);
        }
    }
}; 