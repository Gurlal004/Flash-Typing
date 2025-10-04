FROM node:22-alpine

WORKDIR /Flash-Typing/client/flash-typing

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]