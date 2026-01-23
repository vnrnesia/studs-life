FROM node:20-alpine

WORKDIR /app

# Install dependencies needed for sharp
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Next.js
# We set a dummy URL for build time to preventing failure if Strapi isn't reachable
# Real URL will be provided at runtime
ENV NODE_ENV=production
ENV NEXT_PUBLIC_STRAPI_URL=http://localhost:1337 
RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
