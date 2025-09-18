# Stage 1: Builder
# This stage installs all dependencies (including dev) and builds the TypeScript code.
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files and install all dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript project
RUN npm run build


# Stage 2: Runtime
# This stage creates the lean, final image with only production code and dependencies.
FROM node:20-slim AS runtime

WORKDIR /app

# Copy production dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules
# Copy the compiled JavaScript output from the builder stage
COPY --from=builder /app/dist ./dist
# Copy package.json for runtime context (e.g., name, version)
COPY package.json .

# Expose the port the app runs on
EXPOSE 8080

# The command to run the application
CMD [ "npm", "run", "start" ]
