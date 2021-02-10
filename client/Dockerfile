FROM node:12.20.1-alpine3.12

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./
RUN npm run css

CMD ["npm", "run", "start"]