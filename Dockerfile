FROM node:20-alpine3.18 AS base

ENV DIR /app
WORKDIR $DIR
RUN npm install -g pnpm
ARG PNPM_TOKEN
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

FROM base AS dev

ENV NODE_ENV=development

COPY package*.json .

RUN echo "//registry.npmjs.org/:_authToken=$PNPM_TOKEN" > ".npmrc" && \
  pnpm install && \
  rm -f .npmrc

COPY tsconfig.json .
COPY src src
COPY nest-cli.json .
COPY schema.zmodel .

RUN pnpm run zenstack:generate
EXPOSE $PORT
CMD ["pnpm", "run", "dev"]

FROM base AS build

RUN apk update && apk add --no-cache dumb-init=1.2.5-r2

COPY package*.json .
COPY pnpm-lock.yaml .

RUN echo "//registry.npmjs.org/:_authToken=$PNPM_TOKEN" > ".npmrc" && \
  pnpm install --save-optional \
  "@swc/core-linux-x64-gnu@1" \
  "@swc/core-linux-x64-musl@1" && \
  rm -f .npmrc

COPY tsconfig.json .
COPY src src
COPY nest-cli.json .
COPY schema.zmodel .

RUN pnpm run build && \
  pnpm install --prod
RUN pnpm run zenstack:generate

FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules node_modules
COPY --from=build $DIR/dist dist

USER $USER
EXPOSE $PORT
CMD ["dumb-init", "node", "dist/main.js"]