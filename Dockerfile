# Multi-stage Dockerfile for the parent TriModal project (Frontend + Backend)
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package descriptors and lockfiles
COPY package.json pnpm-lock.yaml* ./
COPY TriModal_Server/package.json TriModal_Server/pnpm-lock.yaml* ./TriModal_Server/

# Install root dependencies
RUN pnpm install --frozen-lockfile

# Install backend dependencies
RUN cd TriModal_Server && pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build frontend
RUN pnpm run build

# Build backend
RUN pnpm run build:server

# Runner stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy build output and configurations
COPY package.json pnpm-lock.yaml* ./
COPY TriModal_Server/package.json TriModal_Server/pnpm-lock.yaml* ./TriModal_Server/

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile
RUN cd TriModal_Server && pnpm install --prod --frozen-lockfile

# Copy compiled files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/TriModal_Server/dist ./TriModal_Server/dist

# Set default port (will be overridden by Cloud Run)
ENV PORT=8080
EXPOSE 8080

# Start the server (which serves the frontend statically)
CMD ["node", "--enable-source-maps", "TriModal_Server/dist/index.mjs"]
