FROM alpine:3.19

WORKDIR /app

# Install dependencies
RUN npm install --production express speedtest-cli lodash@4.x serve-static express-fs body-parser

# Copy only what's needed
COPY package.json ./
COPY public/ ./public
COPY templates/ ./templates

# Use multi-stage to reduce image size
FROM alpine:3.19
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y nodejs

# Copy everything into the final image
COPY package*.json .
COPY public/ ./public
COPY templates/ ./templates

EXPOSE 3000

CMD ["node", "server.js"]