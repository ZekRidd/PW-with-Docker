# 🎯 Playwright Test Framework

A modern and effective Playwright test framework. Write clean and maintainable tests using Page Object Model (POM).

## 🚀 Features

- ✅ **Page Object Model (POM)** - Clean and maintainable code
- ✅ **TypeScript** - Type safety and better IDE support
- ✅ **Configuration Management** - Centralized test settings
- ✅ **Utility Functions** - Reusable helper functions
- ✅ **Test Data Management** - Organized test data
- ✅ **Advanced Hooks** - Automatic screenshots and cleanup
- ✅ **Data-Driven Tests** - Dynamic test scenarios
- ✅ **Performance Tests** - Performance testing
- ✅ **Error Handling** - Error management
- ✅ **Docker Support** - Containerized test execution

## 📁 Project Structure

```
playwright mcp/
├── config/
│   └── test-config.ts          # Test configuration
├── data/
│   └── test-data.ts            # Test data
├── fixtures/
│   ├── test-fixtures.ts        # UI test fixtures
│   ├── api-fixtures.ts         # API test fixtures
│   └── database-fixtures.ts    # Database test fixtures
├── pages/
│   ├── BasePage.ts             # Base page class
│   └── LoginPage.ts            # TodoMVC page class
├── utils/
│   ├── test-utils.ts           # Utility functions
│   └── test-hooks.ts           # Advanced test hooks
├── tests/
│   ├── simple.spec.ts          # Simple tests
│   ├── todo.spec.ts            # TodoMVC tests
│   ├── advanced-todo.spec.ts   # Advanced tests
│   └── fixture-examples.spec.ts # Fixture examples
├── Dockerfile                  # Docker image definition
├── docker-compose.yml          # Docker Compose configuration
├── .dockerignore               # Docker ignore file
├── playwright.docker.config.ts # Docker Playwright configuration
├── README.md                   # Comprehensive documentation
└── package.json               # Project dependencies and scripts
```

## 🛠️ Installation

### Local Installation

```bash
# Install dependencies
npm install

# Install browsers
npm run install-browsers
```

### Docker Installation

```bash
# Build Docker image
npm run test:docker-build

# Run tests in Docker
npm run test:docker
```

## 🧪 Running Tests

### Local Test Execution

#### Basic Commands

```bash
# Run all tests
npm test

# Run in headed mode (browser visible)
npm run test:headed

# Run in UI mode
npm run test:ui

# Run in debug mode
npm run test:debug
```

#### Specific Tests

```bash
# Simple tests only
npm run test:simple

# TodoMVC tests only
npm run test:todo

# Advanced tests
npm run test:advanced

# Fixture examples
npm run test:fixtures

# All test files
npm run test:all
```

#### Browser Options

```bash
# Chromium only
npm run test:chromium

# Firefox only
npm run test:firefox

# WebKit only
npm run test:webkit
```

#### Special Scenarios

```bash
# Parallel execution (4 workers)
npm run test:parallel

# Slow mode (30s timeout)
npm run test:slow

# Generate HTML report
npm run test:report
```

### Docker Test Execution

#### Docker Commands

```bash
# Build Docker image
npm run test:docker-build

# Run tests in Docker
npm run test:docker

# View test reports in Docker
npm run test:docker-report
```

#### Docker Compose Profiles

```bash
# Test profile (for CI/CD)
docker-compose --profile test up playwright-tests

# Development profile (with UI)
docker-compose --profile dev up playwright-dev

# Debug profile
docker-compose --profile debug up playwright-debug

# Report profile
docker-compose --profile report up test-reports
```

#### Docker Manual Commands

```bash
# Build container
docker build -t playwright-framework .

# Run tests
docker run --rm playwright-framework

# Run in UI mode
docker run -p 9323:9323 --rm playwright-framework npm run test:ui

# Run specific tests
docker run --rm playwright-framework npm run test:simple
```

## 📊 Reports

### Local Reports

```bash
# Show HTML report
npm run report

# Show trace file
npm run trace
```

### Docker Reports

```bash
# Start test reports in Docker
npm run test:docker-report

# Access reports
# http://localhost:9323
```

## 🐳 Docker Features

### **Dockerfile**

- **Playwright v1.40.0** - Official Playwright image
- **Ubuntu Focal** - Stable Linux distribution
- **Automatic browser installation** - All browsers included
- **Optimized layers** - Fast build

### **Docker Compose Services**

- **playwright-tests** - Main test service
- **test-reports** - Nginx report service
- **playwright-dev** - Development service (UI)
- **playwright-debug** - Debug service

### **Volume Mappings**

- **test-results** - Test results
- **playwright-report** - HTML reports
- **screenshots** - Screenshots

### **Environment Variables**

- **CI=true** - CI/CD mode
- **PLAYWRIGHT_BROWSERS_PATH** - Browser path

## 🎨 Page Object Model Usage

### Base Page Class

```typescript
import { BasePage } from "../pages/BasePage";

export class MyPage extends BasePage {
  // Define locators
  private readonly myButton = this.page.locator("#my-button");

  // Page methods
  async clickMyButton() {
    await this.clickElement(this.myButton);
  }
}
```

### Writing Tests

```typescript
import { test, expect } from "@playwright/test";
import { MyPage } from "../pages/MyPage";

test("should click button", async ({ page }) => {
  const myPage = new MyPage(page);
  await myPage.clickMyButton();
  // assertions...
});
```

## 🔧 Configuration

### Local Configuration

Manage test settings in `config/test-config.ts`:

```typescript
export const TestConfig = {
  baseUrl: "https://demo.playwright.dev",
  defaultTimeout: 10000,
  // ... other settings
};
```

### Docker Configuration

Docker-specific settings in `playwright.docker.config.ts`:

```typescript
export default defineConfig({
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // ... Docker settings
});
```

## 📝 Test Data Management

Organize test data in `data/test-data.ts`:

```typescript
export const TestData = {
  todos: {
    valid: ["Todo 1", "Todo 2"],
    invalid: ["", "   "],
  },
};
```

## 🚀 Advanced Features

### Data-Driven Tests

```typescript
for (const todo of TestData.todos.valid) {
  test(`should add todo: "${todo}"`, async ({ page }) => {
    // test logic
  });
}
```

### Automatic Screenshots

```typescript
test("should take screenshot", async ({ page }) => {
  // test logic
  await TestUtils.takeScreenshot(page, "test-name");
});
```

### Test Cleanup

```typescript
test("should cleanup after test", async ({ page }) => {
  // test logic
  await TestUtils.cleanupTestData(page);
});
```

## 📈 Best Practices

1. **Use Page Object Model**
2. **Define locators centrally**
3. **Use utility functions**
4. **Keep test data in separate files**
5. **Manage configuration centrally**
6. **Take screenshots automatically**
7. **Clean up tests automatically**
8. **Use Docker for consistent environment**

## 🐛 Troubleshooting

### Local Issues

1. **Browser not installed**

   ```bash
   npm run install-browsers
   ```

2. **Test timeout**

   ```bash
   npm run test:slow
   ```

3. **For debugging**
   ```bash
   npm run test:debug
   ```

### Docker Issues

1. **Image build error**

   ```bash
   npm run test:docker-build
   ```

2. **Container not running**

   ```bash
   docker-compose logs playwright-tests
   ```

3. **Volume access issue**
   ```bash
   docker-compose down -v
   docker-compose up playwright-tests
   ```

## 📞 Support

For issues:

- Use GitHub Issues
- Check Playwright documentation
- Review test logs
- Check Docker logs

---

**Happy Testing! 🎯**
