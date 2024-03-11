FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY ./index.js ./
COPY ./.env ./

COPY ./controllers ./controllers
COPY ./models ./models
COPY ./routes ./routes
COPY ./services ./services
COPY ./utils ./utils

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]