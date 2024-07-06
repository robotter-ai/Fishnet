FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dev"]