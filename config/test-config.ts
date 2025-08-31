export const TestConfig = {
    // Base URLs
    baseUrl: 'https://demo.playwright.dev',
    todoMvcUrl: 'https://demo.playwright.dev/todomvc',
    
    // Timeouts
    defaultTimeout: 10000,
    navigationTimeout: 30000,
    
    // Test Data
    testUsers: {
        validUser: {
            username: 'testuser',
            password: 'testpass123'
        },
        invalidUser: {
            username: 'wronguser',
            password: 'wrongpass'
        }
    },
    
    // Test Todos
    testTodos: [
        'Learn Playwright',
        'Write tests',
        'Run tests',
        'Debug tests',
        'Report bugs'
    ],
    
    // Browser Settings
    browserSettings: {
        headless: false,
        slowMo: 1000,
        viewport: { width: 1280, height: 720 }
    },
    
    // Screenshot Settings
    screenshotSettings: {
        fullPage: true,
        path: 'screenshots/',
        format: 'png'
    }
}; 