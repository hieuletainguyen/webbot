# Use an official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable
ENV PORT=3000

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]