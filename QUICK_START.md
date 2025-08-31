# 🚀 Quick Start - Playwright Docker Framework

## Prerequisites

- Docker Desktop installed
- Internet connection

## Step 1: Download the Project

```bash
# Clone from GitHub (recommended)
git clone https://github.com/username/project-name.git
cd project-name

# OR extract ZIP file
unzip playwright-docker-framework.zip
cd playwright-docker-framework
```

## Step 2: Build Docker Image

```bash
npm run test:docker-build
```

## Step 3: Run Tests

```bash
npm run test:docker
```

## Step 4: View Reports

```bash
npm run test:docker-report
```

Open `http://localhost:9323` in your browser.

## Quick Commands

```bash
# Run all tests
npm run test:docker

# Test with Chromium only
npm run test:chromium

# View test reports
npm run test:docker-report

# Development mode (with UI)
docker-compose --profile dev up
```

## Troubleshooting

- Ensure Docker Desktop is running
- Verify port 9323 is available
- Initial run may take time (image download)

## Support

For issues, refer to README.md file.
