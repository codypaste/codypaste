FROM node:14-alpine AS build

WORKDIR /usr/src/app

# required by build_info script run on build
RUN apk add --no-cache git

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run clean &&\
    npm run build

RUN /bin/sh build_info.sh

FROM node:14-alpine AS app

WORKDIR /usr/src/app

RUN chown node:node /usr/src/app
USER node

# TODO: Investigate why it's needed
RUN mkdir -p /usr/src/app/dist/logs

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY package*.json ./
RUN npm ci --production && npm cache clean --force

COPY --from=build ./usr/src/app/dist ./dist
COPY --from=build ./usr/src/app/config ./config
COPY --from=build ./usr/src/app/build-info.json ./build-info.json

EXPOSE 8080
ENV HOST 0.0.0.0

CMD ["node", "."]