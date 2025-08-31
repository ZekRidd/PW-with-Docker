import { test as base, expect } from '@playwright/test';

// Define custom fixture types
type ApiFixtures = {
    apiBaseUrl: string;
    apiResponse: any; // Response type
    apiTestData: {
        post: { title: string; body: string; userId: number };
        user: { name: string; email: string; phone: string };
    };
};

// API test fixture'ları
export const apiTest = base.extend<ApiFixtures>({
    // API base URL
    apiBaseUrl: async ({}, use) => {
        const baseUrl = 'https://jsonplaceholder.typicode.com'; // Örnek API
        await use(baseUrl);
    },

    // API response fixture'ı
    apiResponse: async ({ request, apiBaseUrl }, use) => {
        const response = await request.get(`${apiBaseUrl}/posts/1`);
        await use(response);
    },

    // Test verisi fixture'ı (API için)
    apiTestData: async ({}, use) => {
        const data = {
            post: {
                title: 'Test Post',
                body: 'Test Body',
                userId: 1
            },
            user: {
                name: 'Test User',
                email: 'test@example.com',
                phone: '123-456-7890'
            }
        };
        await use(data);
    }
});

export { expect } from '@playwright/test'; 