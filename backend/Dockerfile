# Step 1: Use Node.js for backend
FROM node:16

# Step 2: Set working directory for backend
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for dependencies
COPY package*.json ./

# Step 4: Install backend dependencies
RUN npm install

# Step 5: Copy all backend files into the container
COPY . .

# Step 6: Expose the backend port
EXPOSE 5000

# Step 7: Start the backend server
CMD ["npm", "run", "dev"]
