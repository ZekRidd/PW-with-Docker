import { test as base, expect } from '@playwright/test';

// Define custom database fixture types
type DatabaseFixtures = {
    database: {
        query: (sql: string) => Promise<{ rows: any[] }>;
        cleanup: () => Promise<void>;
    };
    dbTestData: {
        users: Array<{ id: number; name: string; email: string }>;
        todos: Array<{ id: number; title: string; completed: boolean }>;
    };
    transaction: {
        query: (sql: string) => Promise<{ rows: any[] }>;
        cleanup: () => Promise<void>;
    };
};

// Database test fixture'ları (örnek)
export const dbTest = base.extend<DatabaseFixtures>({
    // Database bağlantısı (örnek)
    database: async ({}, use) => {
        // Gerçek projede burada database bağlantısı kurulur
        const mockDb = {
            query: async (sql: string) => {
                console.log(`Executing SQL: ${sql}`);
                return { rows: [] };
            },
            cleanup: async () => {
                console.log('Database cleanup completed');
            }
        };
        
        await use(mockDb);
        
        // Test sonrası temizlik
        await mockDb.cleanup();
    },

    // Test verisi fixture'ı (database için)
    dbTestData: async ({}, use) => {
        const data = {
            users: [
                { id: 1, name: 'User 1', email: 'user1@test.com' },
                { id: 2, name: 'User 2', email: 'user2@test.com' }
            ],
            todos: [
                { id: 1, title: 'DB Todo 1', completed: false },
                { id: 2, title: 'DB Todo 2', completed: true }
            ]
        };
        await use(data);
    },

    // Database transaction fixture'ı
    transaction: async ({ database }, use) => {
        // Transaction başlat
        await database.query('BEGIN');
        
        await use(database);
        
        // Transaction'ı geri al (rollback)
        await database.query('ROLLBACK');
    }
});

export { expect } from '@playwright/test'; 