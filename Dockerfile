# Use the official Node.js image as the base image
FROM node:22.3.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Build the TypeScript code
RUN tsc

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/controllers/receiptProcessor.controller.js"]




