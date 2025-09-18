# Stage 1: Build the application
FROM node:20-slim AS build

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the production image
FROM node:20-slim

# Set Node environment to production
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy package.json and install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built application from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD [ "node", "dist/index.js" ]
