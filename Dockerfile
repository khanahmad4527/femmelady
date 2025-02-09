# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/node_modules ./node_modules
CMD ["yarn", "start"]
