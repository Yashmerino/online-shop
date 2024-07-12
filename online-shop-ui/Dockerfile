FROM node:18-alpine

WORKDIR /online-shop-ui/

RUN apk update && \
    apk add --no-cache python3 make g++ && \
    npm install -g node-gyp

COPY . /online-shop-ui/

RUN npm install

CMD ["npm", "start"]