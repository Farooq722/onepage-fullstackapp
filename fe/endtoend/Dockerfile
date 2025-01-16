# Use a Node.js base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the port your React app runs on
EXPOSE 5173

# Start the React development server
CMD ["npm", "run", "dev"]
