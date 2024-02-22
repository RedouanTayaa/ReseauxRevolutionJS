FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN mkdir -p node_modules
RUN npm ci
COPY . .

EXPOSE 4200

CMD ["npm", "run", "dev"]