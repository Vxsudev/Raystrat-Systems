FROM node:20-slim
WORKDIR /srv
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY tsconfig.json ./
COPY src ./src
RUN npx tsc
ENV PORT=8080 NODE_ENV=production
CMD ["node", "dist/index.js"]
