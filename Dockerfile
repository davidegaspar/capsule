FROM node:lts-alpine

RUN apk add g++ make python3

WORKDIR /app

ADD index.js .
ADD package.json .
ADD modules modules

RUN npm install
RUN npm install onoff --save

CMD ["node", "index.js"]
