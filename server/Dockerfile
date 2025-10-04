FROM node:22-alpine

WORKDIR /Flash-Typing/client/flash-typing

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "start"]
