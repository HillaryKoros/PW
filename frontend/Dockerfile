# Frontend service Dockerfile
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code and assets
COPY client/ ./client/
COPY shared/ ./shared/
COPY attached_assets/ ./attached_assets/
COPY build-frontend.js ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./

# Build the frontend only
RUN node build-frontend.js

# Production stage with nginx
FROM nginx:alpine

# Copy built files from correct location
COPY --from=builder /app/dist/public /usr/share/nginx/html

# Copy nginx configuration
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]