FROM node:22-alpine

RUN npm install -g npm@11.6.4

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
USER node

CMD ["npm", "start"]
