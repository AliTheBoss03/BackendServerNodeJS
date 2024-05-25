# Use the official Node.js image as the base image
FROM node:18

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Transpile TypeScript to JavaScript
RUN tsc

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable
ENV PORT 3000

# Start the application
CMD ["node", "dist/index.js"]
