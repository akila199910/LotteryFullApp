# ============================
# 1️⃣ Build Stage
# ============================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Vite production bundle
RUN npm run build

# ============================
# 2️⃣ Production Stage
# ============================
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built Vite assets to Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
