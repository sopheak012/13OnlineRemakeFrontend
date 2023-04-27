# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

# Expose port 3000 for the container
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
