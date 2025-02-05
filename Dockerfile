FROM node:16

WORKDIR /

COPY package*.json ./
RUN npm install --production

EXPOSE 3000
CMD ["node", "server.js"]