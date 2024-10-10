# build base image for nodejs builder for UI
FROM node:20-alpine

WORKDIR /app

COPY package*.json .

# RUN npm ci  // without production flag, it will install dev dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy all source code to /app excluding dist directory
COPY . .
COPY .env.prod .env

# generate prism client
RUN npm run prisma

# Build the application
RUN npm run build:ts

ENV NODE_ENV=production
EXPOSE 4000

CMD ["npm", "start"]