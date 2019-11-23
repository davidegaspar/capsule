FROM node:lts-alpine

RUN apk add g++ make python3

WORKDIR /app

ADD app .

RUN npm ci

CMD ["npm", "start"]
