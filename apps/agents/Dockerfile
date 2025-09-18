# Stage 1: Builder
# This stage installs all dependencies (dev too) and builds the TypeScript code.
FROM node:20-slim AS builder
WORKDIR /app

# Copy only the package files for the agents app
COPY apps/agents/package.json ./
RUN npm install

# Copy the rest of the agent source code
COPY apps/agents/ ./

# Build the TypeScript code
RUN npm run build


# Stage 2: Runtime
# This stage creates the lean, final image for production.
FROM node:20-slim
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV production

# Copy package.json to install only production dependencies
COPY apps/agents/package.json ./
RUN npm install --omit=dev

# Copy the compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 8080

# The command to run the application
CMD ["npm", "start"]
