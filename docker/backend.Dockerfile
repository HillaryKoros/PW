FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy backend source code and build files
COPY backend/ ./backend/
COPY shared/ ./shared/
COPY frontend/ ./frontend/
COPY mapserver/attached_assets/ ./mapserver/attached_assets/
COPY drizzle.config.ts ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./

# Build frontend for production
RUN npm run build:frontend

# Build backend for production
RUN npm run build

# Expose backend port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start backend server with compiled JavaScript
CMD ["node", "dist/index.js"]