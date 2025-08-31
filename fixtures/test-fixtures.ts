import { test as base, expect } from '@playwright/test';
import { TestUtils } from '../utils/test-utils';
import { TestConfig } from '../config/test-config';

// Define custom test fixture types
type TestFixtures = {
    todoPage: any; // Page type
    cleanEnvironment: any; // Page type
    screenshotFixture: (testName: string) => Promise<void>;
    testData: {
        todos: string[];
        user: { name: string; email: string };
    };
    browserSettings: any; // Page type
};

// Test fixture'ları tanımla
export const test = base.extend<TestFixtures>({
    // TodoMVC sayfası için fixture
    todoPage: async ({ page }, use) => {
        await page.goto(TestConfig.todoMvcUrl);
        await TestUtils.waitForPageLoad(page);
        await use(page);
    },

    // Temiz test ortamı için fixture
    cleanEnvironment: async ({ page }, use) => {
        // Test öncesi temizlik
        await page.goto(TestConfig.todoMvcUrl);
        await TestUtils.cleanupTestData(page);
        
        await use(page);
        
        // Test sonrası temizlik
        await TestUtils.cleanupTestData(page);
    },

    // Screenshot fixture'ı
    screenshotFixture: async ({ page }, use) => {
        await use(async (testName: string) => {
            await TestUtils.takeScreenshot(page, testName);
        });
    },

    // Test verisi fixture'ı
    testData: async ({}, use) => {
        const data = {
            todos: ['Test Todo 1', 'Test Todo 2', 'Test Todo 3'],
            user: { name: 'Test User', email: 'test@example.com' }
        };
        await use(data);
    },

    // Browser ayarları fixture'ı
    browserSettings: async ({ page }, use) => {
        await page.setViewportSize(TestConfig.browserSettings.viewport);
        await page.setDefaultTimeout(TestConfig.defaultTimeout);
        await use(page);
    }
});

export { expect } from '@playwright/test'; 