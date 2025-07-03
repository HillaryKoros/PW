# Production Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Install tsx for TypeScript execution
RUN npm install -g tsx

# Copy only server source code (avoid frontend files)
COPY server/ ./server/
COPY shared/ ./shared/

# Copy only essential config files
COPY drizzle.config.ts ./
COPY tsconfig.json ./

# Create directory for mounted assets
RUN mkdir -p /app/attached_assets

EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Create a simple server entry point that skips Vite
COPY <<EOF /app/server-production.ts
import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import your API routes here
// app.use('/api', yourApiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`Backend server running on port \${PORT}\`);
});
EOF

# Use the production entry point
CMD ["tsx", "server-production.ts"]