# Playwright Test Framework Dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Create screenshots directory
RUN mkdir -p screenshots

# Expose port for reports
EXPOSE 9323

# Default command
CMD ["npm", "test"]