FROM node:lts-alpine

RUN apk add g++ make python3

WORKDIR /app
CMD ["npm", "start"]

ADD src/package*.json ./
RUN npm ci

ADD src .
