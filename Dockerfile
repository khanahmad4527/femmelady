# Stage 1: Install all (development) dependencies for building
FROM node:20-alpine AS development-dependencies-env
WORKDIR /app
# Install pnpm globally
RUN npm install -g pnpm
COPY . .
RUN pnpm install --frozen-lockfile

# Stage 2: Install only production dependencies
FROM node:20-alpine AS production-dependencies-env
WORKDIR /app
RUN npm install -g pnpm
# Copy only the files needed to install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Stage 3: Build the Remix application
FROM node:20-alpine AS build-env
WORKDIR /app
RUN npm install -g pnpm

# Copy all application files
COPY . .
# Reuse development dependencies to build the app
COPY --from=development-dependencies-env /app/node_modules ./node_modules
# Build your Remix app (this should run "remix build")
RUN pnpm build

# Stage 4: Final production image
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
# Copy package files for clarity (optional)
COPY package.json pnpm-lock.yaml ./
# Install production dependencies from production stage
COPY --from=production-dependencies-env /app/node_modules ./node_modules
# Copy the built assets; Remix outputs to the "build" directory by default
COPY --from=build-env /app/build ./build

# Set environment variables for runtime
ARG DIRECTUS_URL
ARG APP_URL
ARG APP_DOMAIN
ARG DIRECTUS_DOMAIN
ARG REDIS_URL
ARG CDN_URL
ENV DIRECTUS_URL=${DIRECTUS_URL}
ENV APP_URL=${APP_URL}
ENV APP_DOMAIN=${APP_DOMAIN}
ENV DIRECTUS_DOMAIN=${DIRECTUS_DOMAIN}
ENV REDIS_URL=${REDIS_URL}
ENV CDN_URL=${CDN_URL}

# Expose the port for the cloud run
EXPOSE 3000
# Start the production server (ensure your package.json "start" script is set to run "remix-serve build")
CMD ["pnpm", "start"]
