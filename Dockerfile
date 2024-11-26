FROM node:20-alpine

WORKDIR /app

COPY package*.json .

COPY tsconfig*.json .

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5173

CMD ["npm","run","dev"]