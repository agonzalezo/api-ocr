ARG IMAGE=node
ARG TAG=14.15-alpine3.12

FROM ${IMAGE}:${TAG}
RUN apk update && apk upgrade
RUN apk add --no-cache tesseract-ocr
RUN mkdir -p /opt/apps/node/
WORKDIR /opt/apps/node/
COPY package.json ./
COPY ./src ./src
RUN npm install
RUN chown -R node:node /opt/apps/node
USER node
EXPOSE 3000
RUN ls -l

CMD [ "npm", "start" ]