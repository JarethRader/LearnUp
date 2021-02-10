FROM node:current-alpine3.10

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --silent

COPY . .

EXPOSE 5000

CMD ["npm" "run" "start"]