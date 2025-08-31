# 🐳 Docker-Only Playwright Framework

## Quick Start Guide

### Prerequisites:

- Docker Desktop installed
- Internet connection

### Setup Instructions:

1. **Extract the ZIP file**
2. **Navigate to the project directory**
3. **Execute the following commands:**

```bash
# Build Docker image
docker-compose build

# Run tests
docker-compose run --rm playwright-tests

# View reports
docker-compose --profile report up -d test-reports
```

4. **Open `http://localhost:9323` in your browser**

### Quick Commands:

```bash
# Run everything at once
docker-compose up --build

# Run tests only
docker-compose run --rm playwright-tests npm test

# Cleanup
docker-compose down
```

### Notes:

- Initial run may take time (image download)
- All tests run inside Docker containers
- Results are saved to local directories
