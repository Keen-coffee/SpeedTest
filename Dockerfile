# Use an official Node image.
FROM node:18-alpine

# Set the working directory inside the container.
WORKDIR /app

# Copy package files and install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code.
COPY . .

# Expose the port on which the app will run.
EXPOSE 3000

# Start the Node/Express app.
CMD ["npm", "start"]
