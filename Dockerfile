FROM node:lts-alpine

RUN apk add g++ make python3

WORKDIR /app

ADD index.js .
ADD package.json .
ADD package-lock.json .
ADD modules modules

RUN npm ci

CMD ["npm", "start"]
