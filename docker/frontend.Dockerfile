FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code for build
COPY frontend/ ./frontend/
COPY shared/ ./shared/
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./
COPY vite.config.ts ./

# Build frontend
RUN npm run build:frontend

# Production stage with nginx
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist/public /usr/share/nginx/html

# Copy nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]