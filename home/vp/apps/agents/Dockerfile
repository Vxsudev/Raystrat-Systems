# Stage 1: Build the application
FROM node:20-slim AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the production image
FROM node:20-slim

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD [ "node", "dist/index.js" ]
