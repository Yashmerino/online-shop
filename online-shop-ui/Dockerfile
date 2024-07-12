FROM node:18-alpine

WORKDIR /online-shop-ui/

RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    npm install node-gyp -g

COPY . /online-shop-ui/

RUN npm install

CMD ["npm", "start"]