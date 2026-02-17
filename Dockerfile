# ---------- Build Stage ----------
FROM node:20.20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

# ---------- Runtime Stage ----------
FROM node:20.20-alpine

ENV NODE_ENV=production
WORKDIR /usr/src/app

# Remove npm completely
RUN rm -rf /usr/local/lib/node_modules/npm \
    && rm -f /usr/local/bin/npm \
    && rm -f /usr/local/bin/npx

# Copy built app
COPY --from=builder /app ./

EXPOSE 3000
USER node

CMD ["node", "dist/main.js"]
