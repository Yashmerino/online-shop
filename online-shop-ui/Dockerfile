FROM node:18-alpine as build

WORKDIR /online-shop-ui/

RUN apk update && \
    apk add --no-cache python3 make g++

COPY package.json package-lock.json /online-shop-ui/
RUN npm install

COPY . /online-shop-ui/

FROM node:18-alpine

WORKDIR /online-shop-ui/

COPY --from=build /online-shop-ui/ /online-shop-ui/

EXPOSE 8080

CMD ["npm", "start"]
