FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./index.js ./

COPY ./controllers ./controllers
COPY ./models ./models
COPY ./routes ./routes
COPY ./services ./services
COPY ./utils ./utils

ENV MONGO_URI=mongodb+srv://raiyanabrar:2yIxLdNeTYQROes0@tictactoe.oco4bzg.mongodb.net/tictactoe-db
ENV SERVER_PORT=8080

RUN npm install

EXPOSE 8080
EXPOSE 8888

CMD [ "node", "index.js" ]