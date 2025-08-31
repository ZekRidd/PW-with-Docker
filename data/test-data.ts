export const TestData = {
    // Todo Test Data
    todos: {
        valid: [
            'Learn Playwright',
            'Write automated tests',
            'Debug test failures',
            'Create test reports',
            'Optimize test performance'
        ],
        invalid: [
            '', // Boş todo
            '   ', // Sadece boşluk
            'a'.repeat(1000) // Çok uzun todo
        ],
        special: [
            'Todo with "quotes"',
            'Todo with <script>alert("xss")</script>',
            'Todo with emoji 🎯',
            'Todo with numbers 123',
            'Todo with special chars !@#$%^&*()'
        ]
    },

    // User Test Data
    users: {
        valid: {
            username: 'testuser',
            email: 'test@example.com',
            password: 'TestPass123!'
        },
        invalid: {
            username: '',
            email: 'invalid-email',
            password: '123' // Çok kısa
        }
    },

    // Search Test Data
    searchTerms: {
        valid: ['laptop', 'phone', 'book', 'shoes'],
        invalid: ['', '   ', 'a'.repeat(100)],
        special: ['test@example.com', 'search-term-123', 'search term with spaces']
    },

    // Performance Test Data
    performance: {
        largeTodoList: Array.from({ length: 100 }, (_, i) => `Todo ${i + 1}`),
        stressTest: Array.from({ length: 1000 }, (_, i) => `Stress Todo ${i + 1}`)
    }
};

// Test senaryoları için hazır veri setleri
export const TestScenarios = {
    // Basit todo ekleme
    simpleTodo: {
        description: 'Basit todo ekleme testi',
        todos: ['Test Todo 1', 'Test Todo 2'],
        expectedCount: 2
    },

    // Todo tamamlama
    completeTodo: {
        description: 'Todo tamamlama testi',
        todos: ['Complete Me'],
        actions: ['complete'],
        expectedCompleted: 1
    },

    // Todo silme
    deleteTodo: {
        description: 'Todo silme testi',
        todos: ['Delete Me'],
        actions: ['delete'],
        expectedCount: 0
    },

    // Filtreleme
    filterTodos: {
        description: 'Todo filtreleme testi',
        todos: ['Active Todo 1', 'Active Todo 2', 'Completed Todo'],
        actions: ['complete_last', 'filter_active', 'filter_completed'],
        expectedActive: 2,
        expectedCompleted: 1
    }
}; 