# Base image
FROM node:18.15.0-alpine  AS development

# USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development


COPY . .

RUN npm run build

FROM node:18.15.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production



COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]