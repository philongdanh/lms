# Stage 1: Build
FROM node:20-alpine AS builder
# Install D2 for diagram generation during build
RUN apk add --no-cache wget && \
    wget -qO- https://github.com/terrastruct/d2/releases/download/v0.6.5/d2-v0.6.5-linux-amd64.tar.gz | tar xz -C /tmp && \
    mv /tmp/d2-v0.6.5/bin/d2 /usr/local/bin/d2 && chmod +x /usr/local/bin/d2
WORKDIR /app
COPY package*.json ./
# Use npm ci for reproducible builds (lockfile-based, faster, stricter)
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
